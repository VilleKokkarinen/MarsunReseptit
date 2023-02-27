import { Component, ElementRef } from '@angular/core';
import { ThemeService } from 'src/app/Services/theme.service';
import { Theme } from 'src/app/components/shared/theme';
import { AuthService } from 'src/app/Services/auth.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AddStepIngredientModalComponent } from '../../recipe/add-stepingredient-modal/add-stepingredient-modal.component';

@Component({
  selector: 'app-add-theme',
  templateUrl: './add-theme.component.html',
  styleUrls: ['./add-theme.component.css']
})
export class AddThemeComponent {
  NewTheme:Theme;
  SelectedTheme:Theme|undefined;
  submitted = false;

  constructor(private themeService: ThemeService, private authservice:AuthService, private elementRef: ElementRef,private modalService: NgbModal, config: NgbModalConfig) {
    this.NewTheme = new Theme();

    if(authservice.isLoggedIn)
    this.NewTheme.Publisher = authservice.userData?.uid

    this.NewTheme.PublishDate = new Date;

    config.backdrop = 'static';
		config.keyboard = false;

  }

  public keepOriginalOrder = (a:any, b:any) => a.key

  open() {
    const modalRef = this.modalService.open(AddStepIngredientModalComponent);
  }

  DDSelected(){
    if(this.SelectedTheme != undefined){
      this.NewTheme = JSON.parse(JSON.stringify(this.SelectedTheme));
      this.NewTheme.Name = "";

      for (const [k, v] of Object.entries(this.NewTheme.Theme)) {
        this.update(v,k);
      }
    }
  }

  update(color:string, key:string){
    this.NewTheme.Theme[key] = color;

    console.log(this.NewTheme)
    document.documentElement.style.setProperty(key, color);
  }

  saveTheme(): void {
    console.log(this.NewTheme)
    
    this.themeService.create(JSON.parse(JSON.stringify(this.NewTheme))).then((themeData:Theme) => {
      this.submitted = true;
    });
    this.SelectedTheme = undefined;
    
  }

  newTheme(): void {
    this.submitted = false;
    this.NewTheme = new Theme();

    
    for (const [k, v] of Object.entries(this.NewTheme.Theme)) {
      this.update(v,k);
    }
    
    this.SelectedTheme = undefined;

  }

}
