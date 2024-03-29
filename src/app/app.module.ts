/* core modules */
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { registerLocaleData } from '@angular/common';
import {
  TranslateModule,
  TranslateLoader,
  TranslateService
} from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { FormsModule } from '@angular/forms';


/* Services */
import { PBAuthService } from './Services/pb.auth.service';


/* ui components */
import { HeaderComponent } from './UI/ui-components/header/header.component';
import { AccountDropdownComponent } from './UI/ui-components/header/account-dropdown/account-dropdown.component';
import { FooterComponent } from './UI/ui-components/footer/footer.component';
import { ErrorComponent } from './UI/ui-components/error/error.component';
import { SmallLoadingSpinner } from './UI/ui-components/loading-spinner/small-spinner/small-spinner.component';
import { FullScreenSpinnerComponent } from './UI/ui-components/loading-spinner/full-screen-spinner/full-screen-spinner.component';
import { SidebarComponent } from './UI/ui-components/sidebar/sidebar.component';




/* route components */
import { DashboardComponent } from './Routes/dashboard/dashboard.component';
import { AccountComponent } from './Routes/account/account/account.component';


/* Recipes */
import { AddRecipeComponent } from './Routes/recipe/add-recipe/add-recipe.component';
import { RecipeListComponent } from './Routes/recipe/recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './Routes/recipe/recipe-details/recipe-details.component';


/* Ads */
import { SideAdbarComponent } from './UI/ui-components/ads/side-adbar/side-adbar.component';
import { BannerAdComponent } from './UI/ui-components/ads/bannerad/bannerad.component';
import { TopAdbarComponent } from './UI/ui-components/ads/top-adbar/top-adbar.component';

import { IngredientSearchComponent } from './UI/search-dropdown/ingredient-search/ingredient-search.component';
import { MeasuringUnitSearchComponent } from './UI/search-dropdown/measuring-unit-search/measuring-unit-search.component';
import { UnitSearchComponent } from './UI/search-dropdown/unit-search/unit-search.component';
import { ThemeSearchComponent } from './UI/search-dropdown/theme-search/theme-search.component';
import { RichTextEditorModule } from './UI/rich-text-editor/rich-text-editor.module';
import { QuillModule } from "ngx-quill";
import { AddThemeComponent } from './Routes/theme/add-theme/add-theme.component';

import { ColorPickerModule } from 'ngx-color-picker';
import { RouteDropdownComponent } from './UI/ui-components/header/route-dropdown/route-dropdown.component';
import { ReactiveFormsModule } from "@angular/forms";

import localeEn from '@angular/common/locales/en';
import localeFi from '@angular/common/locales/fi';

import { LocalizedDatePipe } from './Services/localized-date-pipe';
import { CommentfieldComponent } from './UI/ui-components/commentfield/commentfield.component';
import { TOSComponent } from './Routes/tos/tos.component';
import { PrivacyComponent } from './Routes/privacy/privacy.component';

import { MainComponent } from './UI/ui-components/main/main.component';

import { ImageUploadComponent } from './UI/image-upload/image-upload.component';
import { FileDragNDropDirective } from './UI/image-upload/file-dragdrop.directive';
import { SettingsComponent } from './Routes/settings/settings.component';
import { LanguageSearchComponent } from './UI/search-dropdown/language-search/language-search.component';
import { ContactUsComponent } from './Routes/contact-us/contact-us.component';
import { AnalyticsService } from './Services/analytics.service';
import { SignUpModalComponent } from './UI/modals/sign-up-modal/sign-up-modal.component';
import { ForgotPasswordModalComponent } from './UI/modals/forgot-password-modal/forgot-password-modal.component';
import { NotifierModule } from 'angular-notifier';
import { ThemeTestModalComponent } from './UI/modals/theme-test-modal/theme-test-modal.component';
import { ChangeEmailModalComponent } from './UI/modals/change-email-modal/change-email-modal.component';
import { AddCommentComponent } from './UI/ui-components/commentfield/add-comment/add-comment.component';
import { ThemeListComponent } from './Routes/theme/theme-list/theme-list.component';
import { ThemeDetailsComponent } from './Routes/theme/theme-details/theme-details.component';
import { AddRoadmapComponent } from './Routes/roadmap/add-roadmap/add-roadmap.component';
import { RoadmapDetailsComponent } from './Routes/roadmap/roadmap-details/roadmap-details.component';
import { RoadmapListComponent } from './Routes/roadmap/roadmap-list/roadmap-list.component';
import { RoadmapSearchComponent } from './UI/search-dropdown/roadmap-search/roadmap-search.component';
import { AdminLoginComponent } from './Routes/admin-login/admin-login.component';
import { DisclaimerComponent } from './Routes/disclaimer/disclaimer.component';
import { TextareaAutoresizeDirective } from './UI/rich-text-editor/textarea-autoresize.directive';
import { PaginationComponent } from './UI/ui-components/pagination/pagination.component';
registerLocaleData(localeEn);
registerLocaleData(localeFi);

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    ErrorComponent,
    SmallLoadingSpinner,
    FullScreenSpinnerComponent,
    SidebarComponent,
    DashboardComponent,
    AddRecipeComponent,
    RecipeListComponent,
    RecipeDetailsComponent,
    IngredientSearchComponent,
    MeasuringUnitSearchComponent,
    UnitSearchComponent,
    AccountComponent,
    ThemeSearchComponent,
    AddThemeComponent,
    RouteDropdownComponent,
    LocalizedDatePipe,
    CommentfieldComponent,
    TOSComponent,
    PrivacyComponent,
    BannerAdComponent,
    MainComponent,
    SideAdbarComponent,
    TopAdbarComponent,
    LanguageSearchComponent,
    ImageUploadComponent,
    FileDragNDropDirective,
    SettingsComponent,
    ContactUsComponent,
    SignUpModalComponent,
    ForgotPasswordModalComponent,
    ThemeTestModalComponent,
    ChangeEmailModalComponent,
    AddCommentComponent,
    ThemeListComponent,
    ThemeDetailsComponent,
    AddRoadmapComponent,
    RoadmapDetailsComponent,
    RoadmapListComponent,
    RoadmapSearchComponent,
    AdminLoginComponent,
    DisclaimerComponent,
    TextareaAutoresizeDirective,
    PaginationComponent
  ],
  imports: [
    NotifierModule.withConfig({
      position:{
        horizontal:{
          position:"right",
          distance:130
        },
        vertical:{
          position:"top",
          distance:3
        }
      },
      behaviour: {
        autoHide: 4000
      }
    }),
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    AccountDropdownComponent,
    FormsModule,
    QuillModule.forRoot(),
    RichTextEditorModule,
    ColorPickerModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [TranslateModule],
  providers: [
    { provide: LOCALE_ID, useValue: 'en-US' },
    TranslateService,
    PBAuthService,
    AnalyticsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
