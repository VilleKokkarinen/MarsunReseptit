import { Component, Input, Output,EventEmitter } from "@angular/core";
import { FormControl, FormsModule } from "@angular/forms";
import { QuillConfiguration } from "./quill-configuration";

@Component({
  selector: "rich-text-editor",
  templateUrl: "./rich-text-editor.component.html",
  styleUrls: ["./rich-text-editor.component.css"]
})
export class RichTextEditorComponent{
  quillConfiguration = QuillConfiguration;
  @Input() control: any;

  @Output() controlChange = new EventEmitter<string>()

  change(){
    this.controlChange.emit(this.control);
  }

  constructor() {
    this.control = this.control ?? "";
  }
}
