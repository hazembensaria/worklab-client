import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { faTrashCan,faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { result } from 'cypress/types/lodash';
import { User } from 'src/app/Models/user-model';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  trash=faTrashCan
  enter=faArrowUp 

  user!:User;
  name:string="";
  
  

  constructor( private userService : UserService ,  private router:Router) { }
  ngOnInit(): void {
     this.userService.getCurrentUser().subscribe(user=>{
      this.user = user ;
      this.name=user.name
     })
    // get user from userService
    
  } 

  changePassword(){

    this.router.navigate(["/reset"]);

  }

  editProfile(){
    console.log("this.user",this.user);
    if (this.user.name!=this.name)
    {
      this.user.name=this.name
     
      
      this.userService.updateUser(this.user).subscribe(result=>{
        console.log("resultt:",result);
        
        let data=result as {success:string,user:User}
        this.userService.user=data.user;
        alert(data.success);
      },err=>{
        console.log("err",err);
        
          let data=err as {errorMesssage:string}
          alert(data.errorMesssage)
          
      })
    }
   
  }

}
