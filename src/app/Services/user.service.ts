import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { authModel } from '../Models/auth-model';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

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
            this.router.navigate(['home'])
            
          }
    
        })
      }
       //------------------------reset password---------------------------------

    resetPassword(email :string) {
      
      this.http.post('http://localhost:4000/user/reset',{email}).subscribe(result=>{
        console.log(result);
      })
    } 

    //-----------------set new password ---------------------------------------

    setNewPassword(password:string,id:string){
      const userCerdentials={password,id}
      return this.http.post('http://localhost:4000/user/setNewPass',userCerdentials);
    }




      private saveAuthData(token :string  ){
        localStorage.setItem("token" ,token)
      }

      getToken(){
       const token = localStorage.getItem('token');
       return token ;
      }
}
