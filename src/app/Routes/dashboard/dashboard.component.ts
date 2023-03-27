import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PBAuthService } from 'src/app/Services/pb.auth.service';
import { environment } from 'src/environments/environment';
import { TrendingRecipeService } from 'src/app/Services/recipe/trending_recipe.service';
import { SharedService } from 'src/app/Services/shared.service';
import { Trending_Recipe } from 'src/app/components/recipecomponents/recipe';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  TrendingRecipes:Trending_Recipe[]=[];
  
  constructor(
    private recipeService: TrendingRecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private authService:PBAuthService
    ) {
    this.retrieveRecipes(); 
   }

   ngOnInit() {
    this.route.queryParamMap.subscribe(data => {
      var state = data.get("state")
      var code = data.get("code")
      var providerOrNull = localStorage.getItem('provider');
      if(providerOrNull != null){
        const provider = JSON.parse(providerOrNull)
        if (provider.state === state && code != null) {
          this.authService.OAuth(provider.name,
            code,
            provider.codeVerifier,
            environment.oauth.redirectUrl)
        }
      }
    
      var verifytoken = data.get("verifytoken");
      if(verifytoken != null){
        this.authService.ConfirmVerification(verifytoken);
      }

      var pwresettoken = data.get("pwresettoken")
      if(pwresettoken != null){
        this.authService.confirmPasswordReset(pwresettoken, "", "");
      }

      var emailchangetoken = data.get("emailchangetoken")
      if(emailchangetoken != null){
        this.authService.ConfirmVerification(emailchangetoken);
      }
    })
   

  }

   retrieveRecipes(): void {
    this.recipeService.getList(1,10).then((result)=>{
      this.TrendingRecipes = result.items;
    })
  }

  gotoRecipe(recipe: Trending_Recipe) {
    this.router.navigate(['Recipes/'+recipe.id]);
  }

  numberAbbreviator(number:number){
    return SharedService.numberAbbreviator(number,1);
  }
}
