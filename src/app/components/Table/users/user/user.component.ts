import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { errorMessage, timeMessage } from 'src/app/functions/alerts';
import { checkAccessID } from 'src/app/functions/token';
import { UserResponse, UserModule } from 'src/app/Models/user/user.module';
import { UserService } from 'src/app/Service/Table/users/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userForm!:FormGroup;
  user!:UserModule;
  user2!:UserModule;
  userData!:any[];
  id!:number;
  ver:boolean=false;
  access!:any;

  constructor(public userService:UserService, public router:Router, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.createForm()
    this.getall()
    this.setUser2()
    this.access = checkAccessID()
  }

  update(id:number):void{
    if(this.userForm.invalid){
      return Object.values(this.userForm.controls).forEach(control=>{
        control.markAsTouched();
      });
    }else{
      this.setUser();
      this.userService.update(id,this.user).subscribe((data:any)=>{
        timeMessage('Actualizado',1500)
        this.getall()
        this.ver=false
      },error=>{
        errorMessage('Ocurrio un Error')
      });
    }
  }
  delete(id:number):void{
    if(this.userForm.invalid){
      return Object.values(this.userForm.controls).forEach(control=>{
        control.markAsTouched();
      });
    }else{
      this.setUser();
      this.userService.update(id,this.user).subscribe((data:any)=>{
        timeMessage('Usuario Desactivado',1500)
        this.getall()
        this.ver=false
      },error=>{
        errorMessage('Ocurrio un Error')
      });
    }
  }
  getall():void{
    this.userService.getall().subscribe((data:any)=>{
      this.userData=data.users
      console.log(this.userData)
    }
    ,error=>{
      this.router.navigate(['/login'])
    });
  }
  getone(id:number):void{
    this.userService.getone(id).subscribe((data:any)=>{
      this.user2=data[0]
      console.log(this.user2)
      this.id=data[0].id
      console.log('id: '+this.id)
      this.ver=true
    }
    ,error=>{
      errorMessage('Ocurrio un problema')
    });
  }
  setUser():void{
    this.user = {
      email: this.userForm.get('email')?.value,
      password: this.userForm.get('password')?.value,
      accessid: this.userForm.get('accessid')?.value,
      isActivated: this.userForm.get('isActivated')?.value
    }
  }
  setUser2():void{
    this.user2 = {
      email: '', 
      password: '',
      accessid: 0,
      isActivated:0
    }
  }
  createForm():void{
    this.userForm = this.fb.group({
      email: ['',[Validators.required]],
      password: ['',[Validators.required]],
      accessid:[0,[Validators.required]],
      isActivated:[0,[Validators.required]],
    });
  }

}
