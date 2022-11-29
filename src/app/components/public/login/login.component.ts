import { Component, OnInit } from '@angular/core';
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

  
  constructor(private userService  : UserService) {

  }
  onSubmit(myForm:NgForm){
    const user:authModel={email:myForm.value.email,password:myForm.value.password}
    this.userService.loginUser(user.email,user.password);
   
    

  }

  ngOnInit(): void {

  }

}