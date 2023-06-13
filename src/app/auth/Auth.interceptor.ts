import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private auth: AuthService){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const userStorage = window.sessionStorage.getItem('auth-user');
    if(userStorage){
      let user:any = JSON.parse(userStorage);
      const token:string = user.token;
      if(token.length>0 && !this.auth.isExpired()){
        console.warn("SESSIONE VALIDA")
        const cloned = request.clone({headers: request.headers.set("authorization", `Bearer ${token}`)});
        return next.handle(cloned);
      }else{
        console.warn("SESSIONE SCADUTA")
        this.auth.logout();
        window.location.assign("login");
      }
    }
    return next.handle(request);
  }

}
