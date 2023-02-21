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
import { FormsModule } from '@angular/forms';


/* Services */
import { AuthService } from './Services/auth.service';


/* ui components */
import { HeaderComponent } from './UI/ui-components/header/header.component';
import { AccountDropdownComponent } from './UI/ui-components/header/account-dropdown/account-dropdown.component';
import { FooterComponent } from './UI/ui-components/footer/footer.component';
import { ErrorComponent } from './UI/ui-components/error/error.component';
import { LoadingComponent } from './UI/ui-components/loading/loading.component';
import { SidebarComponent } from './UI/ui-components/sidebar/sidebar.component';




/* route components */
import { DashboardComponent } from './Routes/dashboard/dashboard.component';
import { AccountComponent } from './Routes/account/account/account.component';
import { UserComponent } from './Routes/user/user.component';
import { SignUpComponent } from './Routes/account/sign-up/sign-up.component';



/* Recipes */
import { AddRecipeComponent } from './Routes/recipe/add-recipe/add-recipe.component';
import { RecipeListComponent } from './Routes/recipe/recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './Routes/recipe/recipe-details/recipe-details.component';
import { RecipeStepListComponent } from './Routes/recipe/add-recipe/recipe-step-list/recipe-step-list.component';
import { RecipeStepIngredientListComponent } from './Routes/recipe/add-recipe/recipe-step-ingredient-list/recipe-step-ingredient-list.component';



import { IngredientSearchComponent } from './UI/search-dropdown/ingredient-search/ingredient-search.component';
import { MeasuringUnitSearchComponent } from './UI/search-dropdown/measuring-unit-search/measuring-unit-search.component';
import { UnitSearchComponent } from './UI/search-dropdown/unit-search/unit-search.component';
import { AddStepIngredientModalComponent } from './Routes/recipe/add-stepingredient-modal/add-stepingredient-modal.component';
import { ThemeSearchComponent } from './UI/search-dropdown/theme-search/theme-search.component';
import { RichTextEditorModule } from './UI/rich-text-editor/rich-text-editor.module';
import { QuillModule } from "ngx-quill";
import { AddThemeComponent } from './Routes/theme/add-theme/add-theme.component';

import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    ErrorComponent,
    LoadingComponent,
    UserComponent,
    SidebarComponent,
    SignUpComponent,
    DashboardComponent,
    AddRecipeComponent,
    RecipeListComponent,
    RecipeDetailsComponent,
    RecipeStepListComponent,
    RecipeStepIngredientListComponent,
    IngredientSearchComponent,
    MeasuringUnitSearchComponent,
    UnitSearchComponent,
    AddStepIngredientModalComponent,
    AccountComponent,
    ThemeSearchComponent,
    AddThemeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    AccountDropdownComponent,
    FormsModule,
    QuillModule.forRoot(),
    RichTextEditorModule,
    ColorPickerModule,
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
