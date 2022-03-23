import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { errorMessage, timeMessage } from 'src/app/functions/alerts';
import { OrderModule } from 'src/app/Models/Orders/order/order.module';
import { OrderService } from 'src/app/Service/Orders/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderForm!:FormGroup;
  order!:OrderModule;
  order2!:OrderModule;
  id!:number;
  orderData!:any[];
  shipperData!:any[];
  supplierData!:any[];

  constructor(public orderService:OrderService, public router:Router, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.createForm()
    this.getall()
    this.setOrder2()
  }
  insert():void{
    if(this.orderForm.invalid){
      return Object.values(this.orderForm.controls).forEach(control=>{
        control.markAsTouched();
      });
    }else{
      this.setOrder();
      this.orderService.insert(this.order).subscribe((data:any)=>{
        timeMessage('Registrado',1500)
        this.router.navigate(['/suppliers']);
        this.getall()
        this.createForm()
      },error=>{
        errorMessage('Ocurrio un Error')
      });
    }
  }
  // update(id:number):void{
  //   if(this.supplierForm.invalid){
  //     return Object.values(this.supplierForm.controls).forEach(control=>{
  //       control.markAsTouched();
  //     });
  //   }else{
  //     this.setSupplier();
  //     this.supplierService.update(id,this.supplier).subscribe((data:any)=>{
  //       timeMessage('Registrado',1500)
  //       this.router.navigate(['/suppliers']);
  //       this.getall()
  //     },error=>{
  //       errorMessage('Ocurrio un Error')
  //     });
  //   }
  // }
  delete(id:number):void{
    this.orderService.delete(id).subscribe((data:any)=>{
      timeMessage('Borrado',1500)
      this.getall()
    },error=>{
      errorMessage('Ocurrio un Error')
    });
  }
  getall():void{
    this.orderService.getall().subscribe((data:any)=>{
      this.orderData=data.suppliers
      console.log(this.orderData)
    }
    ,error=>{
    });
  }
  getone(id:number):void{
    this.orderService.getone(id).subscribe((data:any)=>{
      this.order2=data.suppliers
      console.log(this.order2)
      this.id=data.suppliers.supplierid
      console.log('id: '+this.id)
    }
    ,error=>{
      errorMessage('Ocurrio un problema')
    });
  }
  setOrder():void{
    this.order = {
      supplierid: this.orderForm.get('supplierid')?.value,
      shipperid: this.orderForm.get('shipperid')?.value,
    }
  }
  setOrder2():void{
    this.order2 = {
      supplierid: 0,
      shipperid: 0,
    }
  }

  createForm():void{
    this.orderForm = this.fb.group({
      name:['',[Validators
        .required]],
      email:['',[Validators.required]],
      phone:['',[Validators.required]],
    });
  }

}
