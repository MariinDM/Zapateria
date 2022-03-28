import { Component, OnInit } from '@angular/core';
import { errorMessage } from 'src/app/functions/alerts';
import { ProductService } from 'src/app/Service/Product/product.service';
import { timer, interval } from 'rxjs';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor(private productService:ProductService) { }

  productData!:any[];
  ngOnInit(): void {
    interval(3000).subscribe(()=>{
      this.getTableProduct()
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
}
