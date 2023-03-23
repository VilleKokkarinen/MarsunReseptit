import { Component, Input, Output,EventEmitter, ElementRef, SecurityContext} from "@angular/core";
import Quill from 'quill';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageService } from "src/app/Services/image.service";
import { Image } from "src/app/components/shared/image";
import QuillImageDropAndPaste, { ImageData as QuillImageData} from 'quill-image-drop-and-paste';
import {  ImageHandler, Options } from 'ngx-quill-upload';
import { PBAuthService } from "src/app/Services/pb.auth.service";
import { NotifierService } from "angular-notifier";
import { TranslateService } from "@ngx-translate/core";
Quill.register('modules/imageDropAndPaste', QuillImageDropAndPaste)
Quill.register('modules/imageHandler', ImageHandler);

@Component({
  selector: "rich-text-editor",
  templateUrl: "./rich-text-editor.component.html",
  styleUrls: ["./rich-text-editor.component.css"]
})
export class RichTextEditorComponent{
  quillConfiguration = {toolbar: [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ header: [1, 2, 3, 4, false] }],
    [{ color: [] }, { background: [] }],
    ["link"],
    ["clean"],
    ["image"]
    ],
    imageHandler: {
      upload: (file) => {
        return new Promise((resolve, reject) => {

        if(this.imageCount >= 5){
          this.notifierService.notify('error', this.translate.instant('TXT_Cant_Insert_Image'));
          reject();
        }

        ImageService.blobToBase64(file).then(base64 => {
          var imageData = new QuillImageData(base64, file.type, file.name)
          imageData
          .minify({
            maxWidth: 756,
            maxHeight: 756,
            quality: 0.75,
          })
          .then((miniImageData:any) => {
            if (miniImageData instanceof QuillImageData) {
              const blob = miniImageData.toBlob();
              this.imageservice.addImage(ImageService.GenerateImageFromBlob(blob,this.authservice.userData.id)).then((result)=>{
                if(result == "Not authenticated"){
                  this.notifierService.notify('error', this.translate.instant('TXT_Authentication_Guard_Block'));
                }else if(typeof result != "string" && result.url){
                  this.Images.push(result)
                  this.insertImage(result.url)
                  resolve(result.url)
                }
                else{
                  alert("error uploading image")
                  reject();
                }
              })
            }
          });
        })
        reject();
      })
      },
      accepts: ['png', 'jpg', 'jpeg'] // Extensions to allow for images (Optional) | Default - ['jpg', 'jpeg', 'png']
    } as Options,
    imageDropAndPaste: {
      // add an custom image handler
      handler: this.imageDropAndPasteHandler.bind(this),
    }
  }
  formats:string[] = [
    'background',
    'bold',
    'color',
    'font',
    'code',
    'italic',
    'link',
    'size',
    'strike',
    'script',
    'underline',
    'blockquote',
    'header',
    'indent',
    'list',
    'align',
    'direction',
    'code-block',
    'formula',
    'image',
    'blob'
    // 'video'
  ]
  quill:Quill|undefined;
  imageCount:number = 0;

  Images:Image[] = [];

  @Input() control: any;
  @Output() controlChange = new EventEmitter<string>()

  change(){
    if(this.quill != undefined){
      var delta = this.quill.getContents();
      var imagecount = 0;
      delta.forEach(op => {
        if(op["insert"]["image"] != null){
          imagecount++;
        }
      })
      this.imageCount = imagecount;
    }
    this.controlChange.emit(this.control);
  }

  constructor(private imageservice:ImageService, private authservice:PBAuthService, private notifierService: NotifierService, private translate:TranslateService) {
    this.control = this.control ?? "";
  }

  created(createdEditor: Quill) {
    this.quill = createdEditor;

    // Add existing images so we can delete them if user deletes them
    if(this.quill != undefined){
      var delta = this.quill.getContents();
      delta.forEach(op => {
        if(op["insert"]["image"] != null){
          this.imageservice.getImageByURL(op["insert"]["image"]["url"]).then(img => {
            this.Images.push(img)
          })
        }
      })
    }
  }

  imageDropAndPasteHandler(dataUrl:any, type: string, imageData:any){
    if(this.imageCount >= 5){
      this.notifierService.notify('error', this.translate.instant('TXT_Cant_Insert_Image'));
    }else{
      imageData
      .minify({
        maxWidth: 756,
        maxHeight: 756,
        quality: 0.75,
      })
      .then((miniImageData:any) => {
        if (miniImageData instanceof QuillImageData) {
          const blob = miniImageData.toBlob();
  
          this.imageservice.addImage(ImageService.GenerateImageFromBlob(blob,this.authservice.userData.id)).then((result)=>{
            if(result == "Not authenticated"){
              this.notifierService.notify('error', this.translate.instant('TXT_Authentication_Guard_Block'));
            }else if(typeof result != "string" && result.url){
              this.Images.push(result)
              this.insertImage(result.url)
            }
            else{
              alert("error uploading image")
            }
          })
        }
      });
    }
  }

  insertImage(url:string){
    let index = (this.quill?.getSelection() || {}).index;

    if (index === undefined || index < 0)
    index = this.quill?.getLength();

    if(index != undefined)
    this.quill?.insertEmbed(index, 'image', url, 'user')
  }

  SaveImages(){ // edit image EOL, to 1 year
    var validimages:Image[] = [];

    if(this.quill != undefined){
      var delta = this.quill.getContents();
      delta.forEach(op => {
        if(op["insert"]["image"] != null){
          var found = this.Images.find(x => x.url.normalize() == op["insert"]["image"]["url"].normalize());
          if(found)
          validimages.push(found)
        }
      })
    }

    validimages.forEach((image) => {
      for (var i = this.Images.length - 1; i >= 0; --i) {
        if (this.Images[i].id == image.id) {
            this.Images.splice(i,1); // splice out the valid ones
        }
      }
    })


    this.Images.forEach(image => { // remove rest
      this.imageservice.deleteImage(image);
    })

    validimages.forEach((image) => {

      var found = false; // check if this image existed already, (editing existing rte)
      this.Images.forEach(oldimage => { // remove rest
        if(oldimage.url.normalize() == image.url.normalize()){
          found = true;
        }
      })

      if(!found){
        this.imageservice.updateImageURL(image).then(()=>{
          this.imageservice.addImageEOL(image)
        })
      
      }else{
        this.imageservice.RefreshImageEOL(image)
      }
    
    })
  }
  
}