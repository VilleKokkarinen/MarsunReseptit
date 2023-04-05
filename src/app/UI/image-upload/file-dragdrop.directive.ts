import { Directive, EventEmitter, HostBinding, HostListener, Output } from "@angular/core";

@Directive({
    selector: '[fileDragDrop]'
  })
  
export class FileDragNDropDirective {
@Output() private filesChangeEmitter : EventEmitter<File[]> = new EventEmitter();

@HostBinding('style.border-color') private borderColor = 'var(--Accent_Border_Color)';
@HostBinding('style.background-color') private backgroundColor = 'var(--Primary_Color)';

constructor() { }

@HostListener('dragover', ['$event']) public onDragOver(evt:any){
    evt.preventDefault();
    evt.stopPropagation();

    this.backgroundColor = 'var(--Accent_Color)';
    this.borderColor = 'var(--Primary_Border_Color)';
}

@HostListener('dragleave', ['$event']) public onDragLeave(evt:any){
    evt.preventDefault();
    evt.stopPropagation();

    this.backgroundColor = 'var(--Primary_Color)';
    this.borderColor = 'var(--Accent_Border_Color)';
}

@HostListener('drop', ['$event']) public onDrop(evt:any){
    evt.preventDefault();
    evt.stopPropagation();
  
    this.backgroundColor = 'var(--Primary_Color)';
    this.borderColor = 'var(--Accent_Border_Color)';

    let files = evt.dataTransfer.files;
    let valid_files : Array<File> = files;
    this.filesChangeEmitter.emit(valid_files);
}
}