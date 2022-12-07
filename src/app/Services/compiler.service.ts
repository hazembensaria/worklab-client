import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class CompilerService {

  constructor(private http:HttpClient ,  private router :Router) { }

  compileCode(code : string){
    const program={code}
    return this.http.post('http://localhost:4000/compiler/code',program);
  }

}