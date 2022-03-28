import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class UserModule {

  constructor(){}

  email:string='';
  password:string='';
  accessid:number=0;

}

export class UserResponse{
  accessid!:number;
}
