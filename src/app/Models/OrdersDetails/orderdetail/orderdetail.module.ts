import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class OrderdetailModule {
  orderid!:number;
  productid!:number;
  quantity!:number;
  unitprice!:number;
}
