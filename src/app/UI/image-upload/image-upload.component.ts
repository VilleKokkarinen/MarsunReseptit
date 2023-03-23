import { Component, EventEmitter, HostListener, Input, Output, OnInit } from '@angular/core';
import { ImageService } from "src/app/Services/image.service";
import { Image } from "src/app/components/shared/image";
import { ImageData as QuillImageData} from 'quill-image-drop-and-paste';
import { PBAuthService } from 'src/app/Services/pb.auth.service';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  @Input() maxWidth: number = 756;
  @Input() maxHeight: number = 756;
  @Input() quality: number = 0.75;

  @Input() selectedImage: Image|undefined;
  @Output() selectedImageChange = new EventEmitter<Image>()

  @Input() selectedImageURL: string|undefined;
  @Output() selectedImageURLChange = new EventEmitter<string>()

  oldImages:Image[] = [];

  constructor(private imageservice: ImageService, private authservice:PBAuthService, private notifierService: NotifierService, private translate:TranslateService){
  }

  ngOnInit(){
    if(this.selectedImageURL)
      this.imageservice.getImageByURL(this.selectedImageURL).then(img => {
      this.selectedImage = img;
      this.oldImages.push(img);
    })
  }

  onFileSelected(event:any) {
    const file:File = event.target.files[0];

    if (file) {
      this.imageUploadHandler(file)
    }
  }

  onFileDropped(file:any) {
    if (file) {
      this.imageUploadHandler(file)
    }
  }

  imageUploadHandler(file:any){
    ImageService.blobToBase64(file).then(base64 => {
      var imageData = new QuillImageData(base64, file.type, file.name)     
      imageData
      .minify({
        maxWidth: this.maxWidth,
        maxHeight: this.maxHeight,
        quality: this.quality,
      })
      .then((miniImageData:any) => {
        if (miniImageData instanceof QuillImageData) {
          const blob = miniImageData.toBlob();

          this.imageservice.addImage(ImageService.GenerateImageFromBlob(blob,this.authservice.userData.id)).then((result)=>{
            if(result == "Not authenticated"){
              this.notifierService.notify('error', this.translate.instant('TXT_Authentication_Guard_Block'));
            }else if(typeof result != "string" && result.url){
              this.oldImages.push(result);
              this.selectedImage = result
              this.selectedImageURL = result.url
              this.selectedImageChange.emit(this.selectedImage);
              this.selectedImageURLChange.emit(this.selectedImageURL);
            }
            else{
              alert("error uploading image")
            }
          })
        }
      });
    })
  }

  SaveImage(){ // edit image EOL, to 1 year
    if(this.selectedImage != undefined)
    {
      this.oldImages.forEach((img)=>{ // remove images user has cycled through or deleted which are not the selected one.
        if(img.id != this.selectedImage?.id){
          this.imageservice.deleteImage(img);
        }
      });

      this.imageservice.getImageURL(this.selectedImage.id).then(url => {
        if(url != "temp")
        {
          if(this.selectedImage != undefined)
            this.imageservice.RefreshImageEOL(this.selectedImage)
        }else{
          if(this.selectedImage != undefined){
            this.imageservice.updateImageURL(this.selectedImage)
            this.imageservice.addImageEOL(this.selectedImage)
          }
        }
      })
    }
  }
}
