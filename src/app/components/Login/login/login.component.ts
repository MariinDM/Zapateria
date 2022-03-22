import { Component, OnInit } from '@angular/core';
import { UserModule } from 'src/app/Models/user/user.module';
import { UserService } from '../../../Service/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { errorMessage, timeMessage } from 'src/app/functions/alerts';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
  }
  loginForm!:FormGroup;
  user!:UserModule;

  constructor(public UserService: UserService,public router:Router,private fb:FormBuilder) {
    this.createFrom();
  }

  login() {
    if(this.loginForm.invalid){
      return Object.values(this.loginForm.controls).forEach(control=>{
        control.markAsTouched();
      });
    }else{
      this.setUser();
      this.UserService.login(this.user).subscribe((data:any)=>{
        timeMessage('Inicio de Sesion',1500)
        this.router.navigate(['/']);
      },error=>{
        errorMessage('Email o Contraseña Incorrecta')
      });
    }
  }

  createFrom():void{
    this.loginForm = this.fb.group({
      email:['', [Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
      password:['',[Validators.required]]
    });
  }

  get getEmail(){
    return this.loginForm.get('email') && this.loginForm.get('email')?.touched
  }
  get getPassword(){
    return this.loginForm.get('password') && this.loginForm.get('password')?.touched
  }

  setUser():void{
    this.user = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    }
  }

}
