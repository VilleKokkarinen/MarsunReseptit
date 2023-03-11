import { Component, ElementRef } from '@angular/core';
import { ThemeService } from 'src/app/Services/theme.service';
import { Theme } from 'src/app/components/shared/theme';
import { AuthService } from 'src/app/Services/auth.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AddStepIngredientModalComponent } from '../../recipe/add-stepingredient-modal/add-stepingredient-modal.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-theme',
  templateUrl: './add-theme.component.html',
  styleUrls: ['./add-theme.component.css']
})
export class AddThemeComponent {
  NewTheme:Theme;
  SelectedTheme:Theme|undefined;
  submitted = false;

  constructor(private themeService: ThemeService, private authservice:AuthService, private elementRef: ElementRef,private modalService: NgbModal, config: NgbModalConfig, private translate:TranslateService) {
    this.NewTheme = new Theme();

    if(authservice.isLoggedIn)
    this.NewTheme.Publisher = authservice.userData?.uid

    this.NewTheme.PublishDate = new Date;

    config.backdrop = 'static';
		config.keyboard = false;
  }

  keepOriginalOrder = (a:any, b:any) => a.key

  translateKey(key:string){

    var splitted = key.substring(2,key.length).split("_");

    var result = "";

    for(var i = 0; i < splitted.length; i++){
      result += this.translate.instant("TXT_"+splitted[i]) + "_";     
    }

    if(splitted.length > 1)
    result = result.substring(0,result.length-1);

    return result;
  }

  open() {
    const modalRef = this.modalService.open(AddStepIngredientModalComponent);
  }

  update(color:string, key:string){
    this.NewTheme.Theme[key] = color;
    this.themeService.applyTheme(this.NewTheme)
  }

  DDSelected(){
    if(this.SelectedTheme != undefined){
      this.NewTheme = JSON.parse(JSON.stringify(this.SelectedTheme));
      this.NewTheme.Name = "";

      this.themeService.applyTheme(this.NewTheme)
    }
  }


  saveTheme(): void {
    this.themeService.create(JSON.parse(JSON.stringify(this.NewTheme))).then((themeData:Theme) => {
      this.submitted = true;
    });
    this.SelectedTheme = undefined;
    
  }

  newTheme(): void {
    this.submitted = false;
    this.NewTheme = new Theme();
    this.themeService.applyTheme(this.NewTheme)
    this.SelectedTheme = undefined;
  }

}
