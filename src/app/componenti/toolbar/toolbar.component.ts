import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  loggedIn: boolean;

  constructor(private auth: AuthService, private router:Router){
    this.loggedIn = auth.isLoggedIn();
  }

  logout(){
    this.auth.logout();
    this.loggedIn=false;
    this.router.navigate(['login'])
  }



}
