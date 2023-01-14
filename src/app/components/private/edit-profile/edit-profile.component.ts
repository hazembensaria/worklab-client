import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { faTrashCan, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { result } from 'cypress/types/lodash';
import { User } from 'src/app/Models/user-model';
import { Worklab } from 'src/app/Models/worklab';
import { UserService } from 'src/app/Services/user.service';
import { WorklabService } from 'src/app/Services/workLab.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  trash = faTrashCan
  enter = faArrowUp

  user!: User;
  name: string = "";
  LabsInfo!: Worklab[]



  constructor(private userService: UserService, private router: Router, private worklabService: WorklabService) { }
  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;
      this.name = user.name
    })
    this.getWorklabs();
    // get user from userService

  }

  changePassword() {

    this.router.navigate(["/reset"]);

  }

  editProfile() {
    console.log("this.user", this.user);
    if (this.user.name != this.name) {
      this.user.name = this.name


      this.userService.updateUser(this.user).subscribe(result => {
        console.log("resultt:", result);

        let data = result as { success: string, user: User }
        this.userService.user = data.user;
        alert(data.success);
      }, err => {
        console.log("err", err);

        let data = err as { errorMesssage: string }
        alert(data.errorMesssage)

      })
    }

  }


  //----------------------get current user's Labs--------------------------
  getWorklabs() {
    console.log("getWorklabsFrom");

    this.worklabService.getWorklabs().subscribe(result => {
      let data = result as { success: string, labs: Worklab[] }
      this.LabsInfo = data.labs
    }, err => {
      console.log("getWorklbsErr", err);

    })
  }


  //---------------------delete lab----------------------------------------

  deleteLab(id:string){
    this.worklabService.deleteLab(id).subscribe(res=>{
      this.getWorklabs();
      let data= res as{success:string,lab:Worklab}
      alert(data.success)
    },err=>{
      console.log("error while deleting lab:",err);
      
    })
  }


  //---------------------visit lab-----------------------------------------

  visitLab(id:string){
    this.router.navigate([`/worklab/${id}`])
  }

}
