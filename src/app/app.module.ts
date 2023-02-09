import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './Components/UI/footer/footer.component';
import { HeaderComponent } from './Components/UI/header/header.component';
import { ErrorComponent } from './Components/UI/error/error.component';
import { LoadingComponent } from './Components/UI/loading/loading.component';
import { UserComponent } from './Components/Templates/user/user.component';
import { MemberComponent } from './Components/Templates/member/member.component';
import { RecipeComponent } from './Components/Templates/recipe/recipe.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    ErrorComponent,
    LoadingComponent,
    UserComponent,
    MemberComponent,
    RecipeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
