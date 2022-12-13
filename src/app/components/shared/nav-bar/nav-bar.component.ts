import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isConnected :boolean = false
  constructor( private userService : UserService) { }

  ngOnInit(): void {
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
    
    }
    
      else
      console.log('non conn');
      
      
  }

  logOut(){
    this.userService.logOut();
    
  }

}
