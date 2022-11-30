import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/public/login/login.component';
import { RegisterComponent } from './components/public/register/register.component';
import { LandingPageComponent } from './components/public/landing-page/landing-page.component';
import { NavBarComponent } from './components/shared/nav-bar/nav-bar.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AuthServiceService } from './Services/auth-service.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { ResetPasswordComponent } from './components/public/reset-password/reset-password.component';
import { HomeComponent } from './components/public/home/home.component';
import { ResetPageComponent } from './components/private/reset-page/reset-page.component';

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
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
     HttpClientModule
    
  ],
  providers: [AuthServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
