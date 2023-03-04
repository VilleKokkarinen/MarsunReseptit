import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Image } from '../components/shared/image';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import PocketBase from "pocketbase";
import { AuthService } from 'src/app/Services/auth.service';
import { ImageData as QuillImageData } from 'quill-image-drop-and-paste';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  baseurl:string = "http://127.0.0.1:8090";
  pb:PocketBase;
  imageServiceKey:string|undefined = undefined;

  constructor(private http: HttpClient, private authservice:AuthService) {
    this.pb = new PocketBase(this.baseurl);
    this.authservice.GetImageServiceKey().pipe(
      ).subscribe(data => {
        this.imageServiceKey = data;
      });
  }

  static GenerateGuid(length:number=15) {
    var guid = "";
    for(var i = 0; i < length; i ++){
      guid += "x";
    }
    return guid.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  static GenerateImageFromBlob(blob:Blob, expireInDays:number=1){
    var img = new Image();
    img.id = ImageService.GenerateGuid();
    img.data = blob;
    img.eol.setDate(new Date().getDate() + expireInDays);
    return img;
  }

  getImageURL(id:string): Promise<string> {
    return new Promise((resolve,reject) => {
      this.pb.collection('images').getOne(id).then((record)=>{
      const firstFilename = record['data'];
      const url = this.pb.getFileUrl(record, firstFilename);
      resolve(url)
      },(err)=>{
        console.log(err)
        reject("Not Found")
      })
    })
  }

  addImage(image:Image): Promise<Image|string> {
    return new Promise((resolve,reject) => {
      if(this.authservice.userData != undefined){
          if(this.imageServiceKey){
            console.log(this.imageServiceKey)
            const formData = new FormData();
            formData.append('publisherkey', this.imageServiceKey);
            formData.append('eol', image.eol.toISOString());
            formData.append('id', image.id);
            formData.append('data', image.data);
            const createdRecord = this.pb.collection('images').create(formData)
            createdRecord.then(data=>{
              const firstFilename = data['data'];
              const url = this.pb.getFileUrl(data, firstFilename);
              image.url = url;
              resolve(image);
            },(err)=>{
              reject(err)
            })
          }
          else{
            this.authservice.SetImageServiceKey();
            reject("No imageService key, adding one for your user, try again!")
          }
      }
      else{
        reject("Not authenticated")
      }
    })
  }

  updateImage(image:Image): Promise<Image|string> {
    return new Promise((resolve,reject) => {
      if(this.authservice.userData != undefined && this.imageServiceKey){
          image.eol.setDate(new Date().getDate() + 365);
          const formData = new FormData();
          formData.append('publisherkey', this.imageServiceKey);
          formData.append('eol', image.eol.toISOString());
          formData.append('id', image.id);
          formData.append('data', image.data);
          const updatedRecord = this.pb.collection('images').update(image.id, formData)
          updatedRecord.then(data=>{
            /*
            const firstFilename = data['data'];
            const url = this.pb.getFileUrl(data, firstFilename);
            image.url = url;
            */
            resolve(image);
          },(err)=>{
            reject(err)
          }) 
      }
      else{
        reject("Not authenticated or missing image service key")
      }
    })
  }

  deleteImage(image:Image): Promise<Image|string> {
    return new Promise((resolve,reject) => {
      if(this.authservice.userData != undefined){
        const updatedRecord = this.pb.collection('images').delete(image.id, {"publisherkey":this.imageServiceKey})
        updatedRecord.then(data=>{
          resolve("ok");
        },(err)=>{
          reject(err)
        })
      }
      else{
        reject("Not authenticated")
      }
    })
  }
}