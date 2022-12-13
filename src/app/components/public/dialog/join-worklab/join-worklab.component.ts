import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/Services/user.service';
import { WorklabService } from 'src/app/Services/workLab.service';

@Component({
  selector: 'app-join-worklab',
  templateUrl: './join-worklab.component.html',
  styleUrls: ['./join-worklab.component.css']
})
export class JoinWorklabComponent implements OnInit {
  workLabId ! : string;
  constructor(private worklabService : WorklabService , private userService : UserService , private router :Router) { }
  userName ! : string ;
  userId ! : string ; 
  loading = false ; 
  ngOnInit(): void {
    this.worklabService.socket?.on('accepted', (obj :any)=>{
      console.log(obj);
      this.worklabService.openDialog.next(false);
      this.router.navigate([`worklab/${obj.worklabId}`])
      
      })
    this.userService.getCurrentUser().subscribe(user=>{
      this.userName = user.name ; 
      this.userId = user._id ;
      console.log(this.userName);
      
    })
  }
  onSubmit(){
    // this.worklabService.joinWorklab({id : this.workLabId}).subscribe(res=>{
    //   console.log(res);
    //   this.router.navigate([`worklab/${this.workLabId}`])
    // })
    this.worklabService.socket.emit("join" , {name : this.userName , id : this.workLabId , userId : this.userId})
    this.loading =true ; 
  }
}
