import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SupplierModule { 
  constructor(){}

  name!:string;
  email!:string;
  phone!:string;
}
