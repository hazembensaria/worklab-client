import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WorklabService {
openDialog  = new Subject<boolean>()
auther !: string ;
socket :any ; 
  constructor(private http:HttpClient ,  private router :Router) { }

  createWorklab(name : string){
    const worklab={name}
    return this.http.post('http://localhost:4000/worklab/create',worklab);
  }

  joinWorklab(worklab : {id :string}){
    
    return this.http.post('http://localhost:4000/worklab/join',worklab);
  }

  getWorklab(worklab : {id : string}){

    return this.http.post('http://localhost:4000/worklab/getWorklab' , worklab)

  }
  addParticipant(participant : {name :string , id : string , worklabId :string}){
    return this.http.post('http://localhost:4000/worklab/addParticipant' , participant)
  }
}