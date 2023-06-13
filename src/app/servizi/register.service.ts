import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { AuthService } from '../auth/auth.service';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient, private urlService:UrlService) {}

  //private url: string = `${this.urlService.localhost}/api/user/registration`;
  private url: string = `${this.urlService.remotehost}/api/user/registration`;

  registerUser(user: User){
    return this.http.post<User>(this.url, user);
  }

}
