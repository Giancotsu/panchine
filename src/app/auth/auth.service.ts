import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { UrlService } from '../servizi/url.service';


const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private urlService:UrlService) { }

  //private url: string = `${this.urlService.localhost}/api/auth/authenticate`;
  private url: string = `${this.urlService.remotehost}/api/auth/authenticate`;

  isAdmin(){
    const userStorage:any = window.sessionStorage.getItem(USER_KEY);
    let user:any = JSON.parse(userStorage);
    if(user.role === "ADMIN"){
      return true;
    }else{
      return false;
    }
  }

  login(user:User){
    return this.http.post<User>(this.url, user);
  }

  logout(){
    window.sessionStorage.removeItem(USER_KEY);
  }

  getUser(){
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  saveUser(user:User){
    if(user){
      window.sessionStorage.removeItem(USER_KEY);
      window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }
    return false;
  }

  isExpired() {
    const userStorage = window.sessionStorage.getItem('auth-user');
    if(userStorage){
      let user:any = JSON.parse(userStorage);
      const exp:Date = user.exp;
      let isExpired:boolean = Date.now() > new Date(exp).getTime() ? true : false;
      return isExpired;
    }
    return true;
}

}
