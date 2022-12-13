import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import {io} from 'socket.io-client' ;
import { WorklabService } from 'src/app/Services/workLab.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isConnected :boolean = false
  show = false
  showJoinWorklab = false ;
  socket : any ;
  readonly uri : string = 'http://localhost:4000'
  constructor( private userService : UserService , private worklabService : WorklabService) { }

  ngOnInit(): void {
    this.worklabService.openDialog.subscribe(next=>{
      this.show = next
    })
    this.worklabService.openDialog.subscribe(next=>{
      this.showJoinWorklab = next
    })
    this.socket = io(`${this.uri}`)
    this.worklabService.socket =this.socket
    // this.notificationService.socket =this.socket
    this.socket.on('aa', (a : string)=>console.log(a)
    )
    
    this.isConnected = this.userService.islogednow
    this.userService.authListner.subscribe(next=>{
      if(next)
      {this.isConnected =true
      console.log("from sub 1");}
      
      else{
        this.isConnected =false
        console.log("from sub2");
        
      }
    })
    console.log(this.isConnected);
    
    if(this.isConnected){
    //  this.loadUser()
    console.log("is connected");
    this.userService.getCurrentUser().subscribe(res=>{
      console.log(res);
      this.socket.emit('newUser', res._id);
    })
    }
    
      else
      console.log('non conn');
      
      
  }
hide(){
  this.show = !this.show
}
joinWorklab(){
  this.showJoinWorklab = !this.showJoinWorklab ; 
}
}
