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
  id!:number;
  brandsData!:any[];

  constructor(public brandService:BrandService, public router:Router, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.createForm()
    this.getall()
    this.setBrand2()
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
        this.router.navigate(['/brands']);
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
        timeMessage('Actualizado',1500)
        this.router.navigate(['/brands']);
        this.getall()
      },error=>{
        errorMessage('Ocurrio un Error')
      });
    }
  }
  delete(id:number):void{
    this.brandService.delete(id).subscribe((data:any)=>{
      timeMessage('Borrado',1500)
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
    });
  }
  getone(id:number):void{
    this.brandService.getone(id).subscribe((data:any)=>{
      this.brand2=data.brands
      console.log(this.brand2)
      this.id=data.brands.brandid
      console.log('id: '+this.id)
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
  setBrand2():void{
    this.brand2 = {
      name: ''
    }
  }
  createForm():void{
    this.brandsForm = this.fb.group({
      name:['',[Validators.required]]
    });
  }

}
