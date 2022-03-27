import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { errorMessage, timeMessage } from 'src/app/functions/alerts';
import { OrderModule } from 'src/app/Models/Orders/order/order.module';
import { OrderdetailModule } from 'src/app/Models/OrdersDetails/orderdetail/orderdetail.module';
import { OrderService } from 'src/app/Service/Orders/order.service';
import { OrderdetailService } from 'src/app/Service/OrdersDetails/orderdetail.service';
import { ProductService } from 'src/app/Service/Product/product.service';
import { ShipperService } from 'src/app/Service/Shippers/shipper.service';
import { SupplierService } from 'src/app/Service/Suppliers/supplier.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderForm!:FormGroup;
  orderdetailsForm!:FormGroup;
  order!:OrderModule;
  orderDetails!:OrderdetailModule;
  id!:number;
  shipperData!:any[];
  supplierData!:any[];
  productsData!:any[];
  productsTable!:any[];

  constructor(public orderService:OrderService, public router:Router, private fb:FormBuilder, public supplierService:SupplierService, public shipperService:ShipperService, public productService:ProductService,public orderDetailsService:OrderdetailService) { }

  ngOnInit(): void {
    this.createForm()
    this.createForm2()
    this.getallSupplier()
    this.getallShipper()
    this.getallProduct()
    //this.setOrder2()
  }

  insert():void{
    if(this.orderForm.invalid){
      return Object.values(this.orderForm.controls).forEach(control=>{
        control.markAsTouched();
      });
    }else{
      this.setOrder();
      this.orderService.insert(this.order).subscribe((data:any)=>{
        //this.getall()
        this.createForm()
        this.id=data.orders.orderid
        this.setOrderDetails()
        this.orderDetailsService.insert(this.orderDetails).subscribe((data:any)=>{
          timeMessage('Insertado',1500)
          this.router.navigate(['/orders']);
          this.createForm2()
        })
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
      this.getallShipper()
      this.getallSupplier()
    },error=>{
      errorMessage('Ocurrio un Error')
    });
  }
  // getall():void{
  //   this.orderService.getall().subscribe((data:any)=>{
  //     this.orderData=data.suppliers
  //     console.log(this.orderData)
  //   }
  //   ,error=>{
  //   });
  // }
  getallSupplier():void{
    this.supplierService.getall().subscribe((data:any)=>{
      this.supplierData=data.suppliers
      console.log(this.supplierData)
    }
    ,error=>{
      
    });
  }
  getallShipper():void{
    this.shipperService.getall().subscribe((data:any)=>{
      this.shipperData=data.shippers
      console.log(this.shipperData)
    }
    ,error=>{
      
    });
  }
  getallProduct():void{
    this.productService.getall().subscribe((data:any)=>{
      this.productsData=data.products
      console.log(this.productsData)
    }
    ,error=>{
      
    });
  }
  // getone(id:number):void{
  //   this.orderService.getone(id).subscribe((data:any)=>{
  //     this.order2=data.suppliers
  //     console.log(this.order2)
  //     this.id=data.suppliers.supplierid
  //     console.log('id: '+this.id)
  //   }
  //   ,error=>{
  //     errorMessage('Ocurrio un problema')
  //   });
  // }
  setOrder():void{
    this.order = {
      supplierid: this.orderForm.get('supplierid')?.value,
      shipperid: this.orderForm.get('shipperid')?.value,
    }
  }
  createForm():void{
    this.orderForm = this.fb.group({
      supplierid:['',[Validators.required]],
      shipperid:['',[Validators.required]],
    });
  }

  addArray(id:number):void{
    this.productService.getone(id).subscribe((data:any)=>{
      this.productsTable.push(data.products)
      console.log(this.productsTable)
    })
  }
  setOrderDetails():void{
    this.orderDetails = {
      productid: this.orderdetailsForm.get('productid')?.value,
      orderid: this.id,
      quantity: this.orderdetailsForm.get('quantity')?.value,
      unitprice: this.orderdetailsForm.get('unitprice')?.value,
    }
  }
  createForm2():void{
    this.orderdetailsForm = this.fb.group({
      productid:[0,[Validators.required]],
      orderid:[0,[Validators.required]],
      quantity:[0,[Validators.required]],
      unitprice:[0,[Validators.required]],
    });
  }

}
