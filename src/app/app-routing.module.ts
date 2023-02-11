import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './Components/UI/sidebar/sidebar.component';
import { ErrorComponent } from './Components/UI/error/error.component';
import { MemberComponent } from './Components/Routes/member/member.component';
import { RecipeComponent } from './Components/Routes/recipe/recipe.component';
import { DashboardComponent } from './Components/Routes/dashboard/dashboard.component';
const routes: Routes =[
  {
    path: '',
    component: SidebarComponent,
    children: [
      {
        path: 'Dashboard',
        component: DashboardComponent
      },
      {
        path: 'Recipes',
        component: RecipeComponent
      }
    ]
  },
  {
    path: 'Member',
    component: MemberComponent
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
