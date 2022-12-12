import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscriber, Subscription } from 'rxjs';
import { Problem } from '../Models/Problem.Model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  email!:String
 
  

  constructor(private http:HttpClient,private userService:UserService) {
     
    this.email=localStorage.getItem("email")||"";
     
   }

   

  addProblem(problem:Problem,password:string){
    console.log(problem,password,this.email);
    

    return this.http.post<{message:string,added:boolean}>('http://localhost:4000/admin/addProblem',{problem,password,email:this.email});

  }
}
