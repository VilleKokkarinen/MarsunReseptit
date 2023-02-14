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
import { HeaderComponent } from './Components/UI/ui-components/header/header.component';
import { AccountDropdownComponent } from './Components/UI/ui-components/header/account-dropdown/account-dropdown.component';
import { FooterComponent } from './Components/UI/ui-components/footer/footer.component';
import { ErrorComponent } from './Components/UI/ui-components/error/error.component';
import { LoadingComponent } from './Components/UI/ui-components/loading/loading.component';
import { SidebarComponent } from './Components/UI/ui-components/sidebar/sidebar.component';
import { DashboardComponent } from './Components/Routes/dashboard/dashboard.component';



/* route components */
import { MemberComponent } from './Components/Routes/member/member.component';


/* Recipes */
import { AddRecipeComponent } from './Components/Routes/recipe/add-recipe/add-recipe.component';
import { RecipeListComponent } from './Components/Routes/recipe/recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './Components/Routes/recipe/recipe-details/recipe-details.component';


/* user components */
import { UserComponent } from './Components/Routes/user/user/user.component';
import { SignUpComponent } from './Components/Routes/user/sign-up/sign-up.component';

import { AuthService } from './Components/shared/services/auth.service';

import { FormsModule } from '@angular/forms';
import { RecipeStepListComponent } from './Components/Routes/recipe/add-recipe/recipe-step-list/recipe-step-list.component';
import { RecipeStepIngredientListComponent } from './Components/Routes/recipe/add-recipe/recipe-step-ingredient-list/recipe-step-ingredient-list.component';
import { IngredientSearchComponent } from './Components/UI/shared/ingredient-search/ingredient-search.component';
import { MeasuringUnitSearchComponent } from './Components/UI/shared/measuring-unit-search/measuring-unit-search.component';




@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    ErrorComponent,
    LoadingComponent,
    UserComponent,
    MemberComponent,
    SidebarComponent,
    SignUpComponent,
    DashboardComponent,
    AddRecipeComponent,
    RecipeListComponent,
    RecipeDetailsComponent,
    RecipeStepListComponent,
    RecipeStepIngredientListComponent,
    IngredientSearchComponent,
    MeasuringUnitSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    AccountDropdownComponent,
    FormsModule,
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
