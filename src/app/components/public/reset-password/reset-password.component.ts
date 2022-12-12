import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }
  onSubmit(myForm:NgForm){
    const user={email:myForm.value.email}
    this.userService.resetPassword(user.email);
    alert("check your mail !")
    

  }
}
