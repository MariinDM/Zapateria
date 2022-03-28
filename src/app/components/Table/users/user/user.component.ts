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
      this.user=data.users
      console.log(this.user)
      this.id=data.users.id
      console.log('id: '+this.id)
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
    }
  }
  setUser2():void{
    this.user2 = {
      email: '', 
      password: '',
      accessid: 3,
    }
  }
  createForm():void{
    this.userForm = this.fb.group({
    
      email: ['',[Validators.required]],
      password: ['',[Validators.required]],
      accessid:['',[Validators.required]],
    });
  }

}
