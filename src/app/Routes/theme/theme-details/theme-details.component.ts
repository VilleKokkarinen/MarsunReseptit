import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from 'src/app/Services/settings.service';
import { Theme } from 'src/app/components/themecomponents/theme';
import { ThemeLike } from 'src/app/components/themecomponents/themelike';
import { PBAuthService } from 'src/app/Services/pb.auth.service';
import { ThemeService } from 'src/app/Services/theme/theme.service';
import { ThemeLikeService } from 'src/app/Services/theme/themelike.service';
import { ThemeTotalLikesService } from 'src/app/Services/theme/theme_total_likes.service';

@Component({
  selector: 'app-theme-details',
  templateUrl: './theme-details.component.html',
  styleUrls: ['./theme-details.component.css']
})
export class ThemeDetailsComponent {
  id:string = "";
  Theme:Theme = new Theme();
  BackupTheme:Theme = new Theme();
  ShowEdit:boolean = false;
  Editing:boolean = false;
  AllowUserToLike:boolean = false;
  AllowUserToDislike:boolean = false;
  LikeData:ThemeLike|undefined;
  Likes:number = 0;
  
  AddingComment:boolean = false;
  

  StyleGroups:string[] = [
    "Bg_Color",
    "Text_Color",
    "Border_Color"
  ];

  constructor(
    private settingsService:SettingsService,
    private translate:TranslateService,
    private themeService: ThemeService,
    private themeLikeService:ThemeLikeService,
    private themeTotalLikesService:ThemeTotalLikesService,
    private route: ActivatedRoute,
    public router: Router,
    private authservice: PBAuthService
  ) { 
  }

  Filter(filter:string):{ [key: string]: string; }{
    const values = Object.keys(this.Theme.theme)
    .filter((key) => key.includes(filter))
    .reduce((obj, key) => {
        return Object.assign(obj, {
          [key]: this.Theme.theme[key]
        });
    }, {});
    return values;
  }

  Remaining():{ [key: string]: string; }{
    var keys_used:string[] = [];
    var all_keys = Object.keys(this.Theme.theme)
    
    this.StyleGroups.forEach(group => {
      var keys = all_keys.filter((key) => key.includes(group))
      keys_used.push(...keys);
    })
    
    const returnvalue = all_keys.filter((key) => !keys_used.includes(key))
    .reduce((obj, key) => {
        return Object.assign(obj, {
          [key]: this.Theme.theme[key]
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

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if(this.id != null){
        this.retrieveTheme();
      }
      else{
        this.router.navigate(['Themes'])
      }
    });

    this.themeTotalLikesService.getOne(this.id).then(data => {
      this.Likes = data.likes;
    })

    this.themeLikeService.HaveILikedThisTheme(this.id).then(data => {
      if(data == null){
      this.AllowUserToLike = true
      }else{
        this.LikeData = data;
        this.AllowUserToDislike = true;
      }

    },()=>{ // error means, user has NOT liked the theme yet
      this.AllowUserToLike = true
    })
  }

  isAdmin(){
    return this.authservice.isAdmin;
  }

  Like(){
    if(this.authservice.userData.id == "")
    {
      return;
    }

    var Like = new ThemeLike();
    Like.theme = this.id;
    Like.publisher = this.authservice.userData.id;
    Like.publishDate = new Date;

    this.AllowUserToLike = false;
    this.themeLikeService.create(Like).then((data)=>{
      this.LikeData = data;
      this.AllowUserToDislike = true;
      this.Likes ++;
    })
  }

  RemoveLike(){
    if(this.authservice.userData.id == "")
    {
      return;
    }

    
    if(this.LikeData != undefined){
      this.AllowUserToDislike = false;
      this.themeLikeService.delete(this.LikeData).then(()=>{
        this.LikeData = undefined;
        this.AllowUserToLike = true;
        this.Likes --;
      })
    }
  }

  retrieveTheme(): void {
    this.themeService.getOne(this.id).then((data)=>{
      this.Theme = data;
      this.BackupTheme = JSON.parse(JSON.stringify(data))
      if(this.authservice.userData.id == this.Theme.publisher && this.Theme.publisher != "")
      this.ShowEdit = true;
    })
  }

  EditTheme(){
    this.Editing = true;
    this.themeService.applyTheme(this.Theme)
  }

  Cancel(){
    this.Editing = false;
    this.Theme = this.BackupTheme;
    this.themeService.applyTheme(this.settingsService.Settings.Theme)
  }

  
  update(color:string, key:string){
    this.Theme.theme[key] = color;
    this.themeService.applyTheme(this.Theme)
  }


  saveTheme(): void {
    if(this.Theme != undefined && this.authservice.userData.id != "")
    this.themeService.update(this.Theme).then((data) => {
      this.Theme = data;
      this.Editing = false;
      this.themeService.applyTheme(this.settingsService.Settings.Theme)
    });
    
  }
}
