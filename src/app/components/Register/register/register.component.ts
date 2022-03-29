import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Service/user.service';
import { UserModule } from 'src/app/Models/user/user.module';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { errorMessage, timeMessage } from 'src/app/functions/alerts';
import { checkLocalStorage } from 'src/app/functions/token';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  registerFrom!:FormGroup;
  user!:UserModule;

  constructor(public UserService:UserService,public router:Router,private fb:FormBuilder) {
    this.createFrom()
   }

  ngOnInit(): void {
  }

  register():void{
    if(this.registerFrom.invalid){
      return Object.values(this.registerFrom.controls).forEach(control=>{
        control.markAsTouched();
      });
    }else{
      this.setUser();
      this.UserService.register(this.user).subscribe((data:any)=>{
        timeMessage('Registrado',1500)
        this.router.navigate(['/login']);
      },error=>{
        errorMessage('Ocurrio un problema')
      });
    }
  }
  createFrom():void{
    this.registerFrom = this.fb.group({
      email:['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
      password:['',[Validators.required]],
      password2:['',[Validators.required]]
    });
  }
  setUser():void{
    this.user = {
      email: this.registerFrom.get('email')?.value,
      password: this.registerFrom.get('password')?.value,
      accessid: 3,
      isActivated:1
    }
  }
  get getEmail(){
    return this.registerFrom.get('email') && this.registerFrom.get('email')?.touched
  }
  get getPassword(){
    return this.registerFrom.get('password') && this.registerFrom.get('password')?.touched
  }
  get passwordsValidate(){
    const pass = this.registerFrom.get('password') ?.value;
    const pass2= this.registerFrom.get('password2') ?.value;

    return  pass===pass2 ? false:true;
  }

}
