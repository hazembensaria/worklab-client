import { Injectable } from '@angular/core';
import { authModel } from '../Models/auth-model';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private authListner=new Subject<boolean>();//bch na3rfou bih est ce que fama user mconecti bch ndesplayi 7ajet fel header w fazet
  private token!:string;
  private islogednow =false ;
  private user : any
    private userId ! : string

  constructor(private http:HttpClient ,  private router :Router) { }




  //------------------------register ------------------------------

  createUser(email:string,password:string,name:string){
    
   
  const user={email:email,password:password,name:name}
    console.log(user)
    this.http.post('http://localhost:4000/user/signUp',user).subscribe(result=>{
      console.log(result);


    })
  }

  

  //------------------------login---------------------------------
  loginUser(email:string,password:string){
    const auth:authModel={email:email,password:password}
    
        this.http.post<{token:string, id:string , name:string,isNew:boolean}>('http://localhost:4000/user/login',auth).subscribe(result=>{
          if(result.token){
          this.user = result ;
            this.saveAuthData(result.token )
            this.islogednow =true ;
            this.userId= result.id
            this.token=result.token;
            this.authListner.next(true);
            if(result.isNew){
    
              this.router.navigate(["/profil"])
            }
            else
            this.router.navigate(['home'])
          }
    
        })
      }


 //---------------------Save Auth Data ------------------------------
 
 private saveAuthData(token :string  ){
  localStorage.setItem("token" ,token)
}


}
