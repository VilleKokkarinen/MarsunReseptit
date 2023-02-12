/* core modules */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';


/* Firebase */
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { providePerformance,getPerformance } from '@angular/fire/performance';
import { PERSISTENCE } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';


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
import { SignUpComponent } from './Components/Routes/user/sign-up/sign-up.component';

import { AuthService } from './Components/shared/services/shared/services/auth.service';



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
    SignUpComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    AccountDropdownComponent,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    providePerformance(() => getPerformance())
  ],
  providers: [
    { provide: PERSISTENCE, useValue: 'local' },
    AuthService,
    ScreenTrackingService,
    UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
