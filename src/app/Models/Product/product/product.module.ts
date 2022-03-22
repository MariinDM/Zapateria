import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ProductModule {
  name!:string;
  color!:string;
  stock!:number;
  price!:number;
  sizeid!:number;
  brandid!:number;
  categoryid!:number;
}
