import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as ace from "ace-builds";
import { UserService } from 'src/app/Services/user.service';
import { WorklabService } from 'src/app/Services/workLab.service';
import { faCoffee , faXmark } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
currentUser : any
faCoffee = faCoffee;
fax = faXmark;
worklab :any
invitations : Array<any>= []
workLabId! : string ;
  constructor( private userService : UserService , private workLabService : WorklabService, private route : ActivatedRoute ) { }
  ngOnInit(): void {
    this.workLabService.socket?.on('accept', (obj :any)=>{
      console.log(obj);
      if(obj.worklabId === this.workLabId){
        this.invitations.push(obj);
      }
      
      })
    this.route.paramMap.subscribe(param=>{
      this.workLabId=param.get("id")??""
      this.workLabService.getWorklab({id : this.workLabId}).subscribe(worklab=>{
        console.log(worklab);
        this.worklab  = worklab ; 
        this.workLabService.auther = this.worklab.auther ;
      })
    })
    this.userService.getCurrentUser().subscribe(res=>{
      console.log(res);
      this.currentUser = res ;
    })
  }
 acceptUser(name : string , id : string){
  const participant = {name , id , worklabId : this.workLabId} ;
  this.workLabService.addParticipant(participant).subscribe(res=>{
    this.workLabService.socket.emit("accept" , {worklabId : this.workLabId,id , message : "accepted"})
    this.invitations = this.invitations.filter(obj=>{obj.participantId !== id}) ;
    
  })

 }
}
