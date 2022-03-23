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

}

export class UserResponse{
  accessid!:number;
}
