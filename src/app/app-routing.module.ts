import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './UI/ui-components/main/main.component';
import { ErrorComponent } from './UI/ui-components/error/error.component';
import { RecipeListComponent } from './Routes/recipe/recipe-list/recipe-list.component';
import { DashboardComponent } from './Routes/dashboard/dashboard.component';
import { AddRecipeComponent } from './Routes/recipe/add-recipe/add-recipe.component';
import { UserComponent } from './Routes/user/user.component';
import { AccountComponent } from './Routes/account/account/account.component';
import { AddThemeComponent } from './Routes/theme/add-theme/add-theme.component';

import { RecipeDetailsComponent } from './Routes/recipe/recipe-details/recipe-details.component';

// route guard
import { AuthGuard } from './Guard/auth.guard';
import { GDPRComponent } from './Routes/gdpr/gdpr.component';
import { PrivacyComponent } from './Routes/privacy/privacy.component';
import { SettingsComponent } from './Routes/settings/settings.component';

const routes: Routes =[
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: '/Dashboard',
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
        path: 'Add-Theme',
        component: AddThemeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'User/:id',
        component: UserComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'Account',
        component: AccountComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'GDPR',
        component: GDPRComponent
      },
      {
        path: 'Privacy',
        component: PrivacyComponent
      },
      {
        path: 'Settings',
        component: SettingsComponent
      },
    ]
  },
  {
    path: 'Error',
    component: ErrorComponent
  },
  {
    path: '**',
    redirectTo: '/Dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
