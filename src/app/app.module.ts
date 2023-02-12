/* core modules */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



/* ui components */
import { HeaderComponent } from './Components/UI/header/header.component';
import { AccountDropdownComponent } from './Components/UI/header/account-dropdown/account-dropdown.component';
import { FooterComponent } from './Components/UI/footer/footer.component';
import { ErrorComponent } from './Components/UI/error/error.component';
import { LoadingComponent } from './Components/UI/loading/loading.component';
import { SidebarComponent } from './Components/UI/sidebar/sidebar.component';
import { DashboardComponent } from './Components/Routes/dashboard/dashboard.component';


/* route components */
import { RecipeComponent } from './Components/Routes/recipe/recipe.component';
import { MemberComponent } from './Components/Routes/member/member.component';



/* user components */
import { UserComponent } from './Components/Routes/user/user/user.component';
import { LoginComponent } from './Components/Routes/user/login/login.component';
import { SignUpComponent } from './Components/Routes/user/sign-up/sign-up.component';





@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    ErrorComponent,
    LoadingComponent,
    UserComponent,
    MemberComponent,
    RecipeComponent,
    SidebarComponent,
    LoginComponent,
    SignUpComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    AccountDropdownComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
