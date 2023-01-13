import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { initial } from 'cypress/types/lodash';
import { UserService } from 'src/app/Services/user.service';
import { WorklabService } from 'src/app/Services/workLab.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
members: any =[] ;
workLabId ! : string ;
workLab : any ;
enabledPerson! :string ;

user ! : any ;
  constructor(private workLabService :WorklabService , private route : ActivatedRoute , private userService : UserService) { }

  ngOnInit(): void {
    // enableOk
  
    console.log("memebres");
    // console.log(this.route.pathFromRoot);
this.workLabService.acceptEvent.subscribe(next=>{
  this.initialse();
})
 this.initialse();
    
  }
private initialse(){
  this.route.queryParams.subscribe(params => {
    this.workLabId = params['message'];
    console.log(this.workLabId);
    this.workLabService.getWorklab({id : this.workLabId}).subscribe(worklab=>{
      console.log(worklab);
      this.workLab = worklab
      
      this.userService.getCurrentUser().subscribe(res=>{
        this.user = res ; 
        this.members = worklab.participants ;
        this.members.push({ name : "auther" , id : worklab.auther});
        

       })
    })
  });
}
enable(id: string){
  this.workLabService.socket.emit("denable",{auther : this.members})
    const me = this.members.filter((object :any) => {
         return object.id !== id;
      });
      console.log(me);
      this.workLabService.socket.emit("enable",{auther : me})
      
}
}
