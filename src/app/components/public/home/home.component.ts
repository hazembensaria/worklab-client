import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as ace from "ace-builds";
import { UserService } from 'src/app/Services/user.service';
import { WorklabService } from 'src/app/Services/workLab.service';
import { faCoffee , faXmark } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css' , './drop-down-menu.scss']
})
export class HomeComponent implements OnInit {
currentUser : any
faCoffee = faCoffee;
fax = faXmark;
worklab :any
invitations : Array<any>= []
participants : any =[] ;
workLabId! : string ;
  constructor( private userService : UserService , private workLabService : WorklabService, private route : ActivatedRoute , private router :Router ) { }
  ngOnInit(): void {
    this.workLabService.socket?.on('accept', (obj :any)=>{
      
      if(obj.worklabId === this.workLabId){
        this.invitations.push(obj);
      }
      
      })
      this.workLabService.socket?.on('anotherOneAdded', (obj :any)=>{
        this.workLabService.acceptEvent.next(true);
        this.workLabService.getWorklab({id : this.workLabId}).subscribe(worklab=>{
          this.worklab = worklab ;
        })
        })

      // anotherOneAdded
      this.route.paramMap.subscribe(param=>{
        this.workLabId=param.get("id")??""
        this.workLabService.getWorklab({id : this.workLabId}).subscribe(worklab=>{
          this.worklab = worklab ;
          console.log(this.worklab);
        
        // this.userService.getCurrentUser().subscribe(res=>{
        //   this.currentUser = res ;
        //   console.log(this.currentUser);
        //   this.participants = worklab.participants ;
        //   console.log(this.participants);
        //   this.participants.push({ name : "auther" , id : worklab.auther});
        //   console.log(this.participants);
        //   this.participants = this.participants.filter((object :any) => {
        //     return object.id !== res._id;
        //   });
        //   console.log(this.participants);
        //  })
      })
    })
  
       
    // this.userService.getCurrentUser().subscribe(res=>{
      
    //   this.currentUser = res ;
    // })
  }
 acceptUser(name : string , id : string){
  const participant = {name , id , worklabId : this.workLabId} ;
  this.workLabService.addParticipant(participant).subscribe(res=>{
    this.workLabService.socket.emit("accept" , {worklabId : this.workLabId,id , message : "accepted"})
    this.workLabService.socket.emit("anotherOne" , { to : this.worklab.participants})

    this.invitations = this.invitations.filter(obj=>{obj.participantId !== id}) ;
    this.workLabService.acceptEvent.next(true);
    this.workLabService.getWorklab({id : this.workLabId}).subscribe(worklab=>{
      this.worklab = worklab ;
      console.log(this.worklab);
      
      // this.userService.getCurrentUser().subscribe(res=>{
      //   this.currentUser = res ;
      //   console.log(this.currentUser);
      //   this.participants = worklab.participants ;
      //   console.log(this.participants);
      //   this.participants.push({ name : "auther" , id : worklab.auther});
      //   console.log(this.participants);
      //   this.participants = this.participants.filter((object :any) => {
      //     return object.id !== res._id;
      //   });
      //   console.log(this.participants);
      //  })
    })
    
  })

 }

 routing(path : string){
  this.router.navigate([`worklab/${this.workLabId}/${path}`], { queryParams: { message: this.workLabId }})
 }
 alertee(){
  alert("hazerm")
  alert("sdf,lk")
 }
}
