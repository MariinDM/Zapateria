import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { errorMessage, timeMessage } from 'src/app/functions/alerts';
import { BrandModule } from 'src/app/Models/brand/brand/brand.module';
import { BrandService } from 'src/app/Service/Brand/brand.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  brandsForm!:FormGroup;
  brand!:BrandModule;
  brand2!:BrandModule;
  brandsData!:any[];

  constructor(public brandService:BrandService, public router:Router, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.createForm()
    this.getall()
  }
  insert():void{
    if(this.brandsForm.invalid){
      return Object.values(this.brandsForm.controls).forEach(control=>{
        control.markAsTouched();
      });
    }else{
      this.setBrand();
      this.brandService.insert(this.brand).subscribe((data:any)=>{
        timeMessage('Registrado',1500)
        this.router.navigate(['/bsc']);
        this.getall()
      },error=>{
        errorMessage('Ocurrio un Error')
      });
    }
  }
  update(id:number):void{
    if(this.brandsForm.invalid){
      return Object.values(this.brandsForm.controls).forEach(control=>{
        control.markAsTouched();
      });
    }else{
      this.setBrand();
      this.brandService.update(id,this.brand).subscribe((data:any)=>{
        timeMessage('Registrado',1500)
        this.router.navigate(['/bsc']);
        this.getall()
      },error=>{
        errorMessage('Ocurrio un Error')
      });
    }
  }
  delete(id:number):void{
    this.brandService.delete(id).subscribe((data:any)=>{
      timeMessage('Registrado',1500)
      this.getall()
    },error=>{
      errorMessage('Ocurrio un Error')
    });
  }
  getall():void{
    this.brandService.getall().subscribe((data:any)=>{
      this.brandsData=data.brands
      console.log(this.brandsData)
    }
    ,error=>{
      errorMessage('Ocurrio un problema')
    });
  }
  getone(id:number):void{
    this.brandService.getone(id).subscribe((data:any)=>{
      this.brand2=data.suppliers
      console.log(this.brand2)
    }
    ,error=>{
      errorMessage('Ocurrio un problema')
    });
  }
  setBrand():void{
    this.brand = {
      name: this.brandsForm.get('name')?.value,
    }
  }
  createForm():void{
    this.brandsForm = this.fb.group({
      name:['',[Validators.required]]
    });
  }

}
