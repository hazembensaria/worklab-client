import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './components/private/edit-profile/edit-profile.component';
import { ProblemsComponent } from './components/private/problems/problems.component';
import { ResetPageComponent } from './components/private/reset-page/reset-page.component';
import { ChatComponent } from './components/public/chat/chat.component';
import { HomeComponent } from './components/public/home/home.component';
import { IdeComponent } from './components/public/ide/ide.component';
import { LandingPageComponent } from './components/public/landing-page/landing-page.component';
import { LoginComponent } from './components/public/login/login.component';
import { MembersComponent } from './components/public/members/members.component';
import { ProblemComponent } from './components/public/problem/problem.component';
import { RegisterComponent } from './components/public/register/register.component';
import { ResetPasswordComponent } from './components/public/reset-password/reset-password.component';


const routes: Routes = [
  {
    path:"login",component:LoginComponent
  },
  {
    path:"problems",component:ProblemsComponent

  },
  {
    path:"editProfile",component:EditProfileComponent

  },
  {
    path:"register",component:RegisterComponent

  },
  {
    path:"worklab/:id",component:HomeComponent , children:[
      {
        path : "members" , component : MembersComponent 
      },
      {
        path : "problem" , component : ProblemComponent 
      },
      {
        path : "" , component : ChatComponent
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
