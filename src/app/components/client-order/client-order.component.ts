import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { errorMessage, timeMessage } from 'src/app/functions/alerts';
import { Carrito } from 'src/app/Models/carrito';
import { CarritoService } from 'src/app/Service/Carrito/carrito.service';
import { ProductService } from 'src/app/Service/Product/product.service';

@Component({
  selector: 'app-client-order',
  templateUrl: './client-order.component.html',
  styleUrls: ['./client-order.component.css']
})
export class ClientOrderComponent implements OnInit {

  carritoForm!:FormGroup;
  carrito!:Carrito;
  id!:number;
  productData!:any[];

  constructor(public carritoService:CarritoService, public productService:ProductService, public router:Router, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.createForm()
    this.getallProduct()
  }
  insert():void{
    if(this.carritoForm.invalid){
      return Object.values(this.carritoForm.controls).forEach(control=>{
        control.markAsTouched();
      });
    }else{
      this.setCarrito();
      this.carritoService.insert(this.carrito).subscribe((data:any)=>{
        timeMessage('Registrado',1500)
        // this.getall()
      },error=>{
        errorMessage('Ocurrio un Error')
      });
    }
  }
  update(id:number):void{
    if(this.carritoForm.invalid){
      return Object.values(this.carritoForm.controls).forEach(control=>{
        control.markAsTouched();
      });
    }else{
      this.setCarrito();
      this.carritoService.update(id,this.carrito).subscribe((data:any)=>{
        timeMessage('Actualizado',1500)
        // this.getall()
      },error=>{
        errorMessage('Ocurrio un Error')
      });
    }
  }
  delete(id:number):void{
    this.carritoService.delete(id).subscribe((data:any)=>{
      timeMessage('Borrado',1500)
      // this.getall()
    },error=>{
      errorMessage('Ocurrio un Error')
    });
  }
  // getall():void{
  //   this.carritoService.getall().subscribe((data:any)=>{
  //     this.brandsData=data.dato
  //     console.log(this.brandsData)
  //   }
  //   ,error=>{
  //   });
  // }
  // getone(id:number):void{
  //   this.carritoService.getone(id).subscribe((data:any)=>{
  //     this.Brand2=data.dato
  //     console.log(this.Brand2)
  //     this.id=data.dato.brandid
  //     console.log('id: '+this.id)
  //   }
  //   ,error=>{
  //     errorMessage('Ocurrio un problema')
  //   });
  // }
  setCarrito():void{
    this.carrito = {
      productid: this.carritoForm.get('productid')?.value,
      unitprice: this.carritoForm.get('unitprice')?.value,
      quantity: this.carritoForm.get('quantity')?.value,
    }
  }
  createForm():void{
    this.carritoForm = this.fb.group({
      productid:[0,[Validators.required]],
      unitprice:[0,[Validators.required]],
      quantity:[0,[Validators.required]]
    });
  }
  getallProduct():void{
    this.productService.getall().subscribe((data:any)=>{
      this.productData=data.dato
      console.log(this.productData)
    }
    ,error=>{
      
    });
  }

}
