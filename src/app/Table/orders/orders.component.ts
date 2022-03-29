import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderModule } from 'src/app/Models/Orders/order/order.module';
import { OrderdetailModule } from 'src/app/Models/OrdersDetails/orderdetail/orderdetail.module';
import { OrderService } from 'src/app/Service/Orders/order.service';
import { OrderdetailService } from 'src/app/Service/OrdersDetails/orderdetail.service';
import { ProductService } from 'src/app/Service/Product/product.service';
import { ShipperService } from 'src/app/Service/Shippers/shipper.service';
import { SupplierService } from 'src/app/Service/Suppliers/supplier.service';
import { timer, interval } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  order!:OrderModule;
  orderDetails!:OrderdetailModule;
  id!:number;
  shipperData!:any[];
  supplierData!:any[];
  productsData!:any[];
  productsTable!:any[];
  orders!:any[];

  constructor(public orderService:OrderService, public router:Router, private fb:FormBuilder, public supplierService:SupplierService, public shipperService:ShipperService, public productService:ProductService,public orderDetailsService:OrderdetailService) { }

  ngOnInit(): void {
    interval(3000).subscribe(()=>{
      // this.getallSupplier()
      // this.getallShipper()
      // this.getallProduct()
      this.getallFK()
    })
    //this.setOrder2()
  }

  getallSupplier():void{
    this.supplierService.getall().subscribe((data:any)=>{
      this.supplierData=data.dato
      console.log(this.supplierData)
    }
    ,error=>{
      
    });
  }
  getallShipper():void{
    this.shipperService.getall().subscribe((data:any)=>{
      this.shipperData=data.dato
      console.log(this.shipperData)
    }
    ,error=>{
      
    });
  }
  getallProduct():void{
    this.productService.getall().subscribe((data:any)=>{
      this.productsData=data.dato
      console.log(this.productsData)
    }
    ,error=>{
      
    });
  }
  getallFK():void{
    this.orderDetailsService.getallFK().subscribe((data:any)=>{
      this.orders=data.dato
      console.log(this.orders)
    }
    ,error=>{
      
    });
  }

}
