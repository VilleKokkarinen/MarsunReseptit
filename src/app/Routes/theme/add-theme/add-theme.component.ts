import { Component } from '@angular/core';
import { ThemeService } from 'src/app/Services/theme.service';
import { Theme } from 'src/app/components/themecomponents/theme';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Settings } from 'src/app/components/settings/settings';
import { SettingsService } from 'src/app/Services/settings.service';
import { PBAuthService } from 'src/app/Services/pb.auth.service';
import { ThemeTestModalComponent } from 'src/app/UI/modals/theme-test-modal/theme-test-modal.component';

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
    private authservice:PBAuthService,
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
    const values = Object.keys(this.NewTheme.theme)
    .filter((key) => key.includes(filter))
    .reduce((obj, key) => {
        return Object.assign(obj, {
          [key]: this.NewTheme.theme[key]
        });
    }, {});
    return values;
  }

  Remaining():{ [key: string]: string; }{
    var keys_used:string[] = [];
    var all_keys = Object.keys(this.NewTheme.theme)
    
    this.StyleGroups.forEach(group => {
      var keys = all_keys.filter((key) => key.includes(group))
      keys_used.push(...keys);
    })
    
    const returnvalue = all_keys.filter((key) => !keys_used.includes(key))
    .reduce((obj, key) => {
        return Object.assign(obj, {
          [key]: this.NewTheme.theme[key]
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
    const modalRef = this.modalService.open(ThemeTestModalComponent);
  }

  update(color:string, key:string){
    this.NewTheme.theme[key] = color;
    this.themeService.applyTheme(this.NewTheme)
  }

  saveTheme(): void {
    if(this.authservice.userData != undefined){
      this.NewTheme.publisher = this.authservice.userData.id
      this.NewTheme.publishDate = new Date;
      this.NewTheme.id = "";
  
      this.themeService.create(this.NewTheme).then(() => {
        this.settingsService.Settings.Theme = this.NewTheme;
        this.settingsService.SaveSettings();
        this.submitted = true;
      });
    }
  }

  newTheme(): void {
    this.submitted = false;
    this.NewTheme = new Theme();
    this.themeService.applyTheme(this.NewTheme)
  }

}
