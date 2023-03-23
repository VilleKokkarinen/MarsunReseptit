import { Image, ImageEOL } from '../components/shared/image';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import PocketBase from "pocketbase";
import { SharedService } from './shared.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  pb:PocketBase;

  constructor() {
    this.pb = new PocketBase(environment.pocketbaseUrl);
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

  static GenerateImageFromBlob(blob:Blob, userId:string){
    var img = new Image();
    img.publisher = userId;
    img.id = ImageService.GenerateGuid();
    img.data = blob;
    return img;
  }

 

  getImageFILEURL(id:string): Promise<string> {
    return new Promise((resolve,reject) => {
      this.pb.collection('images').getOne(id, {"$autoCancel": false}).then((record)=>{
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
      this.pb.collection('images').getOne<Image>(id, {"$autoCancel": false}).then((record)=>{
      resolve(record.url)
      },(err)=>{
        console.log(err)
        reject("Not Found")
      })
    })
  }

  getImageByURL(url:string): Promise<Image> {
    return new Promise((resolve,reject) => {
      this.pb.collection('images').getFirstListItem<Image>('url="'+url.normalize()+'"').then((record)=>{
        resolve(record)
      },(err)=>{
        console.log(err)
        reject("Not Found")
      })
    })
  }

  addImage(image:Image): Promise<Image|string> {
    return new Promise((resolve,reject) => {
        const formData = new FormData();
        formData.append('id', image.id);
        formData.append('publisher', image.publisher);
        formData.append('data', image.data);
        formData.append('url', "temp");
        const createdRecord = this.pb.collection('images').create(formData, {"$autoCancel": false})
        createdRecord.then(data=>{
          const firstFilename = data['data'];
          const url = this.pb.getFileUrl(data, firstFilename);
          image.url = url;
          resolve(image);
        },(err)=>{
          console.log(err)
          reject(err)
        })
    })
  }

  updateImageURL(image:Image): Promise<string> { // should only be used to transform "temp" => actual url
    return new Promise((resolve,reject) => {
      const formData = new FormData();
      formData.append('url', image.url);
      const updatedImage = this.pb.collection('images').update(image.id, formData, {"$autoCancel": false})
      updatedImage.then(data=>{
        resolve("OK");
      },(err)=>{
        reject(err)
      }) 
    })
  }
  

  addImageEOL(image:Image): Promise<string> {
    return new Promise((resolve,reject) => {
      if(image.id){
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
        const updatedRecord = this.pb.collection('images_eol').getFirstListItem('id="'+image.id+'"', {"$autoCancel": false})
        updatedRecord.then(data=>{
          resolve(data["eol"]);
        },(err)=>{
          resolve("");
        }) 
    })
  }

  deleteImage(image:Image): Promise<Image|string> {
    return new Promise((resolve,reject) => {
      const updatedRecord = this.pb.collection('images').delete(image.id, {"$autoCancel": false})
      updatedRecord.then(data=>{
        resolve("OK");
      },(err)=>{
        console.log(err)
        reject(err)
      })
    })
  }
}