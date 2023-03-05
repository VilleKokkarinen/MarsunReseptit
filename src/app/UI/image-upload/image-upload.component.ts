import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ImageService } from "src/app/Services/image.service";
import { Image } from "src/app/components/shared/image";
import { ImageData as QuillImageData} from 'quill-image-drop-and-paste';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {
  @Input() maxWidth: number = 256;
  @Input() maxHeight: number = 256;
  @Input() quality: number = 0.75;

  @Input() selectedImage: Image|undefined;
  @Output() selectedImageChange = new EventEmitter<Image>()

  @Input() selectedImageURL: string|undefined;
  @Output() selectedImageURLChange = new EventEmitter<string>()

  constructor(private imageservice: ImageService){ }

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

          this.imageservice.addImage(ImageService.GenerateImageFromBlob(blob)).then((result)=>{
            if(result == "Not authenticated"){
              alert("You are not authenticated, cannot insert image")
            }else if(typeof result != "string" && result.url){
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
      this.imageservice.updateImageURL(this.selectedImage).then((result)=>{
        console.log(this.selectedImage);
        if(this.selectedImage != undefined)
          this.imageservice.addImageEOL(this.selectedImage)
      })
  }
}
