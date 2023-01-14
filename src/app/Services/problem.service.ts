import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Problem } from '../Models/Problem.Model';

@Injectable({
  providedIn: 'root'
})
export class ProblemService {

  problems:Problem []=[];

  constructor(private http:HttpClient) {

    

   }

   fetchProblems (){
    return this.http.get<{message:string,problems:Problem[]}>("http://localhost:4000/admin/getProblems")
   }

   getProblem(id:string){
      return this.http.get<{message:string,problem:Problem}>(`http://localhost:4000/admin/getProblem/${id}`);
   }
}
