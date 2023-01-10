import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  showPassword=false

  constructor(private userservice : UserService) { }

  ngOnInit(): void {
  }
  async onSubmit (myForm:NgForm){
    const user={
      email:myForm.value.email,
      password:myForm.value.password,
      name:myForm.value.name
                }
                
                await this.userservice.createUser(myForm.value.email,myForm.value.password,myForm.value.name);
                 alert("go check your inbox , please check your spam too") ;

                

  }
  showPass(){

    this.showPassword=!this.showPassword;

  }
}
