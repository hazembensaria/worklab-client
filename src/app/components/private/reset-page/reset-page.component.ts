import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-reset-page',
  templateUrl: './reset-page.component.html',
  styleUrls: ['./reset-page.component.css']
})
export class ResetPageComponent implements OnInit {
   id!:string

  constructor(private userService:UserService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(param=>{
       this.id=param.get('id')??"";
       console.log(this.id);
    })
  }

  onSubmit(myForm:NgForm){


    
    const user={password:myForm.value.password}
    this.userService.setNewPassword(user.password,this.id).subscribe((res)=>{
      console.log("res");
      alert("check your mail your id :!"+ this.id)
      this.router.navigate(["/login"]);


    });
   
  
  }

}
