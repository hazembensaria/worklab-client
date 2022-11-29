import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import {NgForm} from "@angular/forms";
import { authModel } from 'src/app/Models/auth-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  constructor(private  authService:AuthServiceService ) {

  }
  onSubmit(myForm:NgForm){
    const user:authModel={email:myForm.value.email,password:myForm.value.password}
    this.authService.loginUser(user.email,user.password);
  }

  ngOnInit(): void {

  }

}
