import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { errorMessage, timeMessage } from 'src/app/functions/alerts';
import { checkLocalStorage } from 'src/app/functions/token';
import { BrandModule } from 'src/app/Models/brand/brand/brand.module';
import { CategoryModule } from 'src/app/Models/category/category/category.module';
import { ProductModule } from 'src/app/Models/Product/product/product.module';
import { SizeModule } from 'src/app/Models/size/size/size.module';
import { BrandService } from 'src/app/Service/Brand/brand.service';
import { CategoryService } from 'src/app/Service/category/category.service';
import { ProductService } from 'src/app/Service/Product/product.service';
import { SizeService } from 'src/app/Service/Size/size.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productForm!:FormGroup;
  idbrand!:number;
  idsize!:number;
  idcategory!:number;
  product!:ProductModule;
  brand!:BrandModule;
  size!:SizeModule;
  category!:CategoryModule;
  product2!:ProductModule;
  productData!:any[];
  sizeData!:any[];
  categoryData!:any[];
  brandData!:any[];
  constructor(public productService:ProductService, public brandService:BrandService, public sizeService:SizeService, public categoryService:CategoryService, public router:Router, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.createForm()
    this.getall()
    this.getallcategory()
    this.getallbrand()
    this.getallsize()
  }
  insert():void{
    if(this.productForm.invalid){
      return Object.values(this.productForm.controls).forEach(control=>{
        control.markAsTouched();
      });
    }else{
      this.setProduct();
      this.productService.insert(this.product).subscribe((data:any)=>{
        timeMessage('Registrado',1500)
        this.router.navigate(['/products']);
        this.getall()
        this.createForm()
      },error=>{
        errorMessage('Ocurrio un Error')
      });
    }
  }
  update(id:number):void{
    if(this.productForm.invalid){
      return Object.values(this.productForm.controls).forEach(control=>{
        control.markAsTouched();
      });
    }else{
      this.setProduct();
      this.productService.update(id,this.product).subscribe((data:any)=>{
        timeMessage('Registrado',1500)
        this.router.navigate(['/products']);
        this.getall()
      },error=>{
        errorMessage('Ocurrio un Error')
      });
    }
  }
  delete(id:number):void{
    this.productService.delete(id).subscribe((data:any)=>{
      timeMessage('Registrado',1500)
      this.getall()
    },error=>{
      errorMessage('Ocurrio un Error')
    });
  }
  getall():void{
    this.productService.getall().subscribe((data:any)=>{
      this.productData=data.products
      console.log(this.productData)
    }
    ,error=>{
      
    });
  }
  getallsize():void{
    this.sizeService.getall().subscribe((data:any)=>{
      this.sizeData=data.sizes
      console.log(this.sizeData)
    }
    ,error=>{
      
    });
  }
  getallcategory():void{
    this.categoryService.getall().subscribe((data:any)=>{
      this.categoryData=data.categories
      console.log(this.categoryData)
    }
    ,error=>{
      
    });
  }
  getallbrand():void{
    this.brandService.getall().subscribe((data:any)=>{
      this.brandData=data.brands
      console.log(this.brandData)
    }
    ,error=>{
      
    });
  }
  getone(id:number):void{
    this.productService.getone(id).subscribe((data:any)=>{
      this.product2=data.products
      console.log(this.product2)
    }
    ,error=>{
      errorMessage('Ocurrio un problema')
    });
  }
  getoneBrand(id:number):void{
    this.brandService.getone(id).subscribe((data:any)=>{
      this.brand=data.brands
      console.log(this.brand)
    }
    ,error=>{
      errorMessage('Ocurrio un problema')
    });
  }
  getoneSize(id:number):void{
    this.sizeService.getone(id).subscribe((data:any)=>{
      this.size=data.sizes
      console.log(this.size)
    }
    ,error=>{
      errorMessage('Ocurrio un problema')
    });
  }
  getoneCategory(id:number):void{
    this.categoryService.getone(id).subscribe((data:any)=>{
      this.category=data.categories
      console.log(this.category)
    }
    ,error=>{
      errorMessage('Ocurrio un problema')
    });
  }
  setProduct():void{
    this.product = {
      name: this.productForm.get('name')?.value,
      color: this.productForm.get('color')?.value,
      stock: this.productForm.get('stock')?.value,
      price: this.productForm.get('price')?.value,
      sizeid: this.idsize = this.productForm.get('sizeid')?.value,
      brandid: this.idbrand = this.productForm.get('brandid')?.value,
      categoryid: this.idcategory = this.productForm.get('categoryid')?.value,
    }
  }

  createForm():void{
    this.productForm = this.fb.group({
      name:['',[Validators.required]],
      color:['',[Validators.required]],
      stock:[0,[Validators.required]],
      price:[0.0,[Validators.required]],
      sizeid:[0,[Validators.required]],
      brandid:[0,[Validators.required]],
      categoryid:[0,[Validators.required]],
    });
  }
}
