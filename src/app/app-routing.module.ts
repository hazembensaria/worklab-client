import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProblemsComponent } from './components/private/problems/problems.component';
import { ResetPageComponent } from './components/private/reset-page/reset-page.component';
import { HomeComponent } from './components/public/home/home.component';
import { IdeComponent } from './components/public/ide/ide.component';
import { LandingPageComponent } from './components/public/landing-page/landing-page.component';
import { LoginComponent } from './components/public/login/login.component';
import { RegisterComponent } from './components/public/register/register.component';
import { ResetPasswordComponent } from './components/public/reset-password/reset-password.component';


const routes: Routes = [
  {
    path:"login",component:LoginComponent
  },
  {
    path:"register",component:RegisterComponent

  },
  {
    path:"home",component:HomeComponent , children:[
      {
        path : "" , component : IdeComponent
      }
    ]

  },
  {
    path:"problems",component:ProblemsComponent

  },
  {
    path:"reset",component:ResetPasswordComponent

  },
  {
    path:"user/reset/:id",component:ResetPageComponent

  },
  {
    path:"**",component:LandingPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
