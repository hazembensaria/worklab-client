import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class CompilerService {

  constructor(private http:HttpClient ,  private router :Router) { }

  compileCode(code : string , language : string){
    const program={code , language}
    return this.http.post('http://localhost:4000/compiler/code',program);
  }

}