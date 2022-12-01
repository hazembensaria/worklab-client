import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import {NgForm} from "@angular/forms";
import { authModel } from 'src/app/Models/auth-model';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showPassword = false
  @ViewChild("password")
  private password!: ElementRef<HTMLElement>;
  
  constructor(private userService  : UserService) {

  }
  onSubmit(myForm:NgForm){
    const user:authModel={email:myForm.value.email,password:myForm.value.password}
    this.userService.loginUser(user.email,user.password);
   
    

  }

  ShowPass(){
    this.showPassword = !this.showPassword
      
      
      
  }

  ngOnInit(): void {

  }

}