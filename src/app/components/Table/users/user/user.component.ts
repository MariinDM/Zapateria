import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { errorMessage, timeMessage } from 'src/app/functions/alerts';
import { UserResponse } from 'src/app/Models/user/user.module';
import { UserService } from 'src/app/Service/Table/users/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userForm!:FormGroup;
  user!:UserResponse;
  userData!:any[];
  id!:number;

  constructor(public userService:UserService, public router:Router, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.createForm()
    this.getall()
    this.setUser2()
  }

  update(id:number):void{
    if(this.userForm.invalid){
      return Object.values(this.userForm.controls).forEach(control=>{
        control.markAsTouched();
      });
    }else{
      this.setUser();
      this.userService.update(id,this.user).subscribe((data:any)=>{
        timeMessage('Registrado',1500)
        this.router.navigate(['/users']);
        this.getall()
      },error=>{
        errorMessage('Ocurrio un Error')
      });
    }
  }
  getall():void{
    this.userService.getall().subscribe((data:any)=>{
      this.userData=data.users
      console.log(data)
      console.log(this.userData)
    }
    ,error=>{
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
      accessid: this.userForm.get('accessid')?.value,
    }
  }
  setUser2():void{
    this.user = {
      accessid: 0
    }
  }
  createForm():void{
    this.userForm = this.fb.group({
      accessid:['',[Validators.required]],
    });
  }

}
