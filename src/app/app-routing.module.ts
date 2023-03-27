import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './UI/ui-components/main/main.component';
import { ErrorComponent } from './UI/ui-components/error/error.component';
import { RecipeListComponent } from './Routes/recipe/recipe-list/recipe-list.component';
import { DashboardComponent } from './Routes/dashboard/dashboard.component';
import { AddRecipeComponent } from './Routes/recipe/add-recipe/add-recipe.component';
import { AccountComponent } from './Routes/account/account/account.component';
import { AddThemeComponent } from './Routes/theme/add-theme/add-theme.component';

import { RecipeDetailsComponent } from './Routes/recipe/recipe-details/recipe-details.component';

// route guard
import { AuthGuard } from './Guard/auth.guard';
import { TOSComponent } from './Routes/tos/tos.component';
import { PrivacyComponent } from './Routes/privacy/privacy.component';
import { SettingsComponent } from './Routes/settings/settings.component';
import { ContactUsComponent } from './Routes/contact-us/contact-us.component';
import { ThemeDetailsComponent } from './Routes/theme/theme-details/theme-details.component';
import { ThemeListComponent } from './Routes/theme/theme-list/theme-list.component';
import { AddRoadmapComponent } from './Routes/roadmap/add-roadmap/add-roadmap.component';
import { RoadmapListComponent } from './Routes/roadmap/roadmap-list/roadmap-list.component';
import { RoadmapDetailsComponent } from './Routes/roadmap/roadmap-details/roadmap-details.component';
import { AdminLoginComponent } from './Routes/admin-login/admin-login.component';
import { ChangeLogComponent } from './Routes/change-log/change-log.component';

const routes: Routes =[
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'Dashboard',
        pathMatch: 'full'
      },
      {
        path: 'Dashboard',
        component: DashboardComponent
      },
      {
        path: 'Recipes',
        component: RecipeListComponent
      },
      {
        path: 'Recipes/:id',
        component: RecipeDetailsComponent
      },
      {
        path: 'Add-Recipe',
        component: AddRecipeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'Themes',
        component: ThemeListComponent
      },
      {
        path: 'Themes/:id',
        component: ThemeDetailsComponent
      },
      {
        path: 'Add-Theme',
        component: AddThemeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'Roadmaps',
        component: RoadmapListComponent
      },
      {
        path: 'Roadmaps/:id',
        component: RoadmapDetailsComponent
      },
      {
        path: 'Add-Roadmap',
        component: AddRoadmapComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'Account',
        component: AccountComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'TOS',
        component: TOSComponent
      },
      { 
        path: 'Contact-Us',
        component: ContactUsComponent
      },
      {
        path: 'Privacy',
        component: PrivacyComponent
      },
      {
        path: 'Settings',
        component: SettingsComponent
      },
      {
        path: 'Change-Log',
        component: ChangeLogComponent
      }
    ]
  },
  {
    path: 'Error',
    component: ErrorComponent
  },
  {
    path: 'AdminLogin',
    component: AdminLoginComponent
  },
  {
    path: '**',
    redirectTo: 'Dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
