import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WorklabService {
openDialog  = new Subject<boolean>()
socket :any ; 
acceptEvent  = new Subject<boolean>()
removeParticipant = new Subject<string>() 
  constructor(private http:HttpClient ,  private router :Router) { }

  createWorklab(name : string  , problemId? : string){
    const worklab={name , problemId}
    return this.http.post('http://localhost:4000/worklab/create',worklab);
  }

  joinWorklab(worklab : {id :string}){
    
    return this.http.post('http://localhost:4000/worklab/join',worklab);
  }

  getWorklab(worklab : {id : string}){

    return this.http.post<{sharedCode : boolean , _id : string ,  chat : [] , auther :string , participants :[] , problemId : string}>('http://localhost:4000/worklab/getWorklab' , worklab)

  }
  addParticipant(participant : {name :string , id : string , worklabId :string}){
    return this.http.post('http://localhost:4000/worklab/addParticipant' , participant)
  }
  addMessage(message : string ,name  :string, id :string){
    const obj ={
      message,
      name,
      id
    }
    return this.http.post('http://localhost:4000/worklab/addMessage' , obj)
  }

  saveCode(code: string ,id :string){
    const obj ={
     code ,id
    }
    return this.http.post('http://localhost:4000/worklab/saveCode' , obj)
  }

  deleteParticipantFromWorklab(idParticipant: string , worklabId :string){
    const obj ={
      idParticipant,
     worklabId
    }
    return this.http.post('http://localhost:4000/worklab/deleteParticipant' , obj)
  }
}