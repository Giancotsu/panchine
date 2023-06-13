import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup | any
  loginError:Boolean = false

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.loginForm = new FormGroup({

      username: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)])
    })
  }

  onSubmit(){
    console.log(this.loginForm.value.username, this.loginForm.value.password)

    if(!this.loginForm.valid){
      this.loginError = true;
    }else{
      this.loginError = false;
      let user:User = new User;
      user.setUsername(this.loginForm.value.username)
      user.setPassword(this.loginForm.value.password)
      this.authService.login(user).subscribe(ris =>{
        console.log(ris);
        this.authService.saveUser(ris);
        this.reloadPage();
      },
      err =>{
        console.log(err)
        this.loginError=true;
      })
    }
  }

  reloadPage(): void {
    window.location.assign("classifica");

  }
}
