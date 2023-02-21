import { Component, ElementRef } from '@angular/core';
import { ThemeService } from 'src/app/Services/theme.service';
import { Theme, ThemeObject } from 'src/app/components/shared/theme';
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
  submitted = false;

  constructor(private themeService: ThemeService, private authservice:AuthService, private elementRef: ElementRef,private modalService: NgbModal, config: NgbModalConfig) {
    this.NewTheme = new Theme();
    this.NewTheme.Theme = new ThemeObject();

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


   update(color:string, key:string){
    document.documentElement.style.setProperty(key, color);
    console.log(key, color);
  
      //this.themeService.loadTheme(themestring);
   }

  saveTheme(): void {
    this.themeService.create(JSON.parse(JSON.stringify(this.NewTheme))).then((themeData:Theme) => {
      this.submitted = true;
    });
  }

  newTheme(): void {
    this.submitted = false;
    this.NewTheme = new Theme();
    this.NewTheme.Theme = new ThemeObject();
  }

}
