import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Image, ImageEOL } from '../components/shared/image';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import PocketBase from "pocketbase";
import { AuthService } from 'src/app/Services/auth.service';
import { SharedService } from './shared.service';
@Injectable({
  providedIn: 'root'
})
export class ImageService {
  baseurl:string = "https://83.102.58.1:443";
  pb:PocketBase;
  imageServiceKey:string|undefined = undefined;

  constructor(private http: HttpClient, private authservice:AuthService) {
    this.pb = new PocketBase(this.baseurl);
    this.authservice.GetImageServiceKey().pipe(
      ).subscribe(data => {
        this.imageServiceKey = data;
      });
  }

  static blobToBase64(blob:Blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
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
    return img;
  }

 

  getImageFILEURL(id:string): Promise<string> {
    return new Promise((resolve,reject) => {
      this.pb.collection('images').getOne(id,{"imageservicekey":this.imageServiceKey}).then((record)=>{
      const firstFilename = record['data'];
      const url = this.pb.getFileUrl(record, firstFilename);
      resolve(url)
      },(err)=>{
        console.log(err)
        reject("Not Found")
      })
    })
  }

  getImageURL(id:string): Promise<string> {
    return new Promise((resolve,reject) => {
      this.pb.collection('images').getOne<Image>(id,{"imageservicekey":this.imageServiceKey}).then((record)=>{
      resolve(record.url)
      },(err)=>{
        console.log(err)
        reject("Not Found")
      })
    })
  }

  getImageByURL(url:string): Promise<Image> {
    return new Promise((resolve,reject) => {
      SharedService.waitFor(()=> this.authservice.userData != undefined && this.imageServiceKey != undefined, () => {
        this.pb.collection('images').getFirstListItem<Image>('url="'+url.normalize()+'"',{"imageservicekey":this.imageServiceKey}).then((record)=>{
          resolve(record)
        },(err)=>{
          console.log(err)
          reject("Not Found")
        })
      }, 10)
    })
  }

  addImage(image:Image): Promise<Image|string> {
    return new Promise((resolve,reject) => {
      if(this.authservice.userData != undefined){
          if(this.imageServiceKey){
            const formData = new FormData();
            formData.append('imageservicekey', this.imageServiceKey);
            formData.append('id', image.id);
            formData.append('data', image.data);
            formData.append('url', "temp");
            const createdRecord = this.pb.collection('images').create(formData)
            createdRecord.then(data=>{
              const firstFilename = data['data'];
              const url = this.pb.getFileUrl(data, firstFilename);
              image.url = url;
              resolve(image);
            },(err)=>{
              console.log(err)
              reject(err)
            })
          }
          else{
            this.authservice.SetImageServiceKey();
            alert("No imageService key found, adding one for your user, try again!")
            reject("No imageService key found, adding one for your user, try again!");
          }
      }
      else{
        reject("Not authenticated")
      }
    })
  }

  updateImageURL(image:Image): Promise<string> { // should only be used to transform "temp" => actual url
    return new Promise((resolve,reject) => {
      if(this.authservice.userData != undefined && this.imageServiceKey){
          const formData = new FormData();
          formData.append('url', image.url);
          const updatedImage = this.pb.collection('images').update(image.id, formData,{"imageservicekey":this.imageServiceKey})
          updatedImage.then(data=>{
            resolve("OK");
          },(err)=>{
            reject(err)
          }) 
      }
      else{
        reject("Not authenticated or missing image service key")
      }
    })
  }
  

  addImageEOL(image:Image): Promise<string> {
    return new Promise((resolve,reject) => {
      if(this.authservice.userData != undefined && this.imageServiceKey && image.id){
        var date = new Date();
        date.setDate(new Date().getDate() + 365);
        const formData = new FormData();
        formData.append('eol', date.toISOString());
        formData.append('image', image.id);
        formData.append('id', image.id);
        const createdRecord = this.pb.collection('images_eol').create(formData, {"$autoCancel": false})
        createdRecord.then(data=>{
          resolve("OK");
        },(err)=>{
          console.log(err)
          reject(err)
        })
      }
      else{
        console.log("addImageEOL No permission")
        reject("No permission")
      }
    })
  }

  RefreshImageEOL(image:Image): Promise<string> {
    return new Promise((resolve,reject) => {
        var date = new Date();
        date.setDate(new Date().getDate() + 365);
        const formData = new FormData();
        formData.append('eol', date.toISOString());
        const updatedRecord = this.pb.collection('images_eol').update(image.id, formData, {"$autoCancel": false})
        updatedRecord.then(data=>{
          resolve("OK");
        },(err)=>{
          reject(err)
        }) 
    })
  }

  GetImageEOL(image:Image): Promise<string> {
    return new Promise((resolve,reject) => {
        const updatedRecord = this.pb.collection('images_eol').getFirstListItem('id="'+image.id+'"')
        updatedRecord.then(data=>{
          resolve(data["eol"]);
        },(err)=>{
          resolve("");
        }) 
    })
  }

  deleteImage(image:Image): Promise<Image|string> {
    return new Promise((resolve,reject) => {
      if(this.authservice.userData != undefined){
        const updatedRecord = this.pb.collection('images').delete(image.id, {"imageservicekey":this.imageServiceKey})
        updatedRecord.then(data=>{
          resolve("OK");
        },(err)=>{
          console.log(err)
          reject(err)
        })
      }
      else{
        reject("Not authenticated")
      }
    })
  }
}