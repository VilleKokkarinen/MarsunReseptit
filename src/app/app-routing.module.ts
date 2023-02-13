import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './Components/UI/sidebar/sidebar.component';
import { ErrorComponent } from './Components/UI/error/error.component';
import { MemberComponent } from './Components/Routes/member/member.component';
import { RecipeListComponent } from './Components/Routes/recipe/recipe-list/recipe-list.component';
import { DashboardComponent } from './Components/Routes/dashboard/dashboard.component';
import { AddRecipeComponent } from './Components/Routes/recipe/add-recipe/add-recipe.component';

// route guard
import { AuthGuard } from './Components/shared/guard/auth.guard';

const routes: Routes =[
  {
    path: '',
    component: SidebarComponent,
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
        path: 'Add-Recipe',
        component: AddRecipeComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'Member',
    component: MemberComponent,
    canActivate: [AuthGuard]
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
