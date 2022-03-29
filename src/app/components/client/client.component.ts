import { Component, OnInit } from '@angular/core';
import { errorMessage, timeMessage } from 'src/app/functions/alerts';
import { ProductService } from 'src/app/Service/Product/product.service';
import { timer, interval } from 'rxjs';
import { CarritoService } from 'src/app/Service/Carrito/carrito.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor(private productService:ProductService, private carritoService:CarritoService) { }

  productData!:any[];
  buyprodructs!:any[];
  ngOnInit(): void {
    interval(3000).subscribe(()=>{
      // this.getTableProduct()
      this.getCarrito()
    })

  }
  getTableProduct():void{
    this.productService.getTableProducts().subscribe((data:any)=>{
      this.productData=data.dato
      console.log(this.productData)
    }
    ,error=>{
      errorMessage('Ocurrio un problema')
    });
  }
  getCarrito():void{
    this.carritoService.getone(3).subscribe((data:any)=>{
      this.buyprodructs=data.find
      console.log(this.buyprodructs)
    }
    ,error=>{
      errorMessage('Ocurrio un problema')
    });
  }
  update():void{
      this.carritoService.update().subscribe((data:any)=>{
        timeMessage('Comprado',1500)
        this.getCarrito()
      },error=>{
        errorMessage('Ocurrio un Error')
      });
  }
  delete(id:number):void{
    this.carritoService.delete(id).subscribe((data:any)=>{
      timeMessage('Registrado',1500)
      this.getCarrito()
    },error=>{
      errorMessage('Ocurrio un Error')
    });
  }
}
