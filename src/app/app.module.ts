import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/public/login/login.component';
import { RegisterComponent } from './components/public/register/register.component';
import { LandingPageComponent } from './components/public/landing-page/landing-page.component';
import { NavBarComponent } from './components/shared/nav-bar/nav-bar.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ResetPasswordComponent } from './components/public/reset-password/reset-password.component';
import { HomeComponent } from './components/public/home/home.component';
import { ResetPageComponent } from './components/private/reset-page/reset-page.component';
import { IdeComponent } from './components/public/ide/ide.component';

import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBadgeModule } from '@angular/material/badge';
import { CreateWorklabComponent } from './components/public/dialog/create-worklab/create-worklab.component';
// import {ButtonModule} from 'primeng/button';
import { MatInputModule } from '@angular/material/input';
import { authInteractor } from './Intercetors/authInterceptor';
import { JoinWorklabComponent } from './components/public/dialog/join-worklab/join-worklab.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MatButtonModule } from '@angular/material/button';
import { ProblemsComponent } from './components/private/problems/problems.component';
import { MatSelectModule } from '@angular/material/select';
import { MembersComponent } from './components/public/members/members.component';
import { ChatComponent } from './components/public/chat/chat.component';
import { ProblemComponent } from './components/public/problem/problem.component';
import { EditProfileComponent } from './components/private/edit-profile/edit-profile.component';
import { SolveProblemComponent } from './components/public/solve-problem/solve-problem.component';
import { ProblemCommentsComponent } from './components/public/problem-comments/problem-comments.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LandingPageComponent,
    NavBarComponent,
    ResetPasswordComponent,
    HomeComponent,
    ResetPageComponent,
    IdeComponent,

    CreateWorklabComponent,
    JoinWorklabComponent,

    ProblemsComponent,
    MembersComponent,
    ChatComponent,
    ProblemComponent,
    EditProfileComponent,
    SolveProblemComponent,
    ProblemCommentsComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,

    MatMenuModule,
    MatDialogModule,
    MatBadgeModule,
    MatInputModule,
    FontAwesomeModule,
    MatSelectModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: authInteractor, multi: true }],




  bootstrap: [AppComponent]
})
export class AppModule { }
