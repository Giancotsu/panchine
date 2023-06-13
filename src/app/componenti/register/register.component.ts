import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/model/user.model';
import { RegisterService } from 'src/app/servizi/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  registerForm: FormGroup | any
  registrationError:Boolean = false

  constructor(private regService: RegisterService, private auth:AuthService){}

  ngOnInit(): void {
    this.registerForm = new FormGroup({

      username: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)])
    })
  }

  onSubmit(){
    console.log(this.registerForm.value.username, this.registerForm.value.password)
    if(!this.registerForm.valid){
      this.registrationError = true;
    }else{
      this.registrationError = false;
      let user:User = new User;
      user.setUsername(this.registerForm.value.username)
      user.setPassword(this.registerForm.value.password)
      this.regService.registerUser(user).subscribe(user=>{
        console.log(user);
        this.auth.saveUser(user);
        this.reloadPage();
      })
    }
  }

  reloadPage(): void {
    window.location.assign("classifica");

  }

}
