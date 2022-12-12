import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import { AuthServiceService } from "../Services/auth-service.service";
import { UserService } from "../Services/user.service";
// import { UserService } from "../Servecis/userService";


@Injectable()
export class authInteractor implements  HttpInterceptor{
  constructor(private authService:UserService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token =this.authService.getToken();    
    const authRequest=req.clone({
      headers:req.headers.set("authorization","bearer " + token)
    });
    return next.handle(authRequest);
  }
}
