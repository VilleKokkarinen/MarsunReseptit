import { Component } from '@angular/core';
import { ThemeService } from 'src/app/Services/theme.service';
import { Theme } from 'src/app/components/shared/theme';
import { AuthService } from 'src/app/Services/auth.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AddStepIngredientModalComponent } from '../../recipe/add-stepingredient-modal/add-stepingredient-modal.component';
import { TranslateService } from '@ngx-translate/core';
import { Settings } from 'src/app/components/shared/settings';
import { SettingsService } from 'src/app/Services/settings.service';

@Component({
  selector: 'app-add-theme',
  templateUrl: './add-theme.component.html',
  styleUrls: ['./add-theme.component.css']
})
export class AddThemeComponent {
  NewTheme:Theme;
  submitted = false;

  Settings:Settings;

  StyleGroups:string[] = [
    "Bg_Color",
    "Text_Color",
    "Border_Color"
  ];

  constructor(
    private settingsService:SettingsService,
    private themeService: ThemeService,
    private authservice:AuthService,
    private modalService: NgbModal,
    config: NgbModalConfig,
    private translate:TranslateService) {

    this.Settings = this.settingsService.Settings;
    this.NewTheme = this.Settings.Theme;

    this.settingsService.SettingsChange.subscribe((newSettings)=>{
      this.Settings = newSettings
      this.NewTheme = this.Settings.Theme;
    })

    config.backdrop = 'static';
		config.keyboard = false;
  }

  Filter(filter:string):{ [key: string]: string; }{
    const values = Object.keys(this.NewTheme.Theme)
    .filter((key) => key.includes(filter))
    .reduce((obj, key) => {
        return Object.assign(obj, {
          [key]: this.NewTheme.Theme[key]
        });
    }, {});
    return values;
  }

  Remaining():{ [key: string]: string; }{
    var keys_used:string[] = [];
    var all_keys = Object.keys(this.NewTheme.Theme)
    
    this.StyleGroups.forEach(group => {
      var keys = all_keys.filter((key) => key.includes(group))
      keys_used.push(...keys);
    })

    console.log(keys_used)
   
    const returnvalue = all_keys.filter((key) => !keys_used.includes(key))
    .reduce((obj, key) => {
        return Object.assign(obj, {
          [key]: this.NewTheme.Theme[key]
        });
    }, {});

    return returnvalue;
  }

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

  saveTheme(): void {
    this.NewTheme.Publisher = this.authservice.userData.uid
    this.NewTheme.PublishDate = new Date;

    this.themeService.create(JSON.parse(JSON.stringify(this.NewTheme))).then(() => {
      this.settingsService.Settings.Theme = this.NewTheme;
      this.settingsService.SaveSettings();
      this.submitted = true;
    });
  }

  newTheme(): void {
    this.submitted = false;
    this.NewTheme = new Theme();
    this.themeService.applyTheme(this.NewTheme)
  }

}
