import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { errorMessage, timeMessage } from 'src/app/functions/alerts';
import { BrandModule } from 'src/app/Models/brand/brand/brand.module';
import { BrandService } from 'src/app/Service/Brand/brand.service';
import { timer, interval} from 'rxjs';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  brandsForm!:FormGroup;
  Brand!:BrandModule;
  Brand2!:BrandModule;
  id!:number;
  brandsData!:any[];

  constructor(public brandService:BrandService, public router:Router, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.getall()
    // interval(3000).subscribe(()=>{
    //   this.getall()
    // })
    this.createForm()
    this.setBrand2()
  }
  insert():void{
    if(this.brandsForm.invalid){
      return Object.values(this.brandsForm.controls).forEach(control=>{
        control.markAsTouched();
      });
    }else{
      this.setBrand();
      this.brandService.insert(this.Brand).subscribe((data:any)=>{
        timeMessage('Registrado',1500)
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
      this.brandService.update(id,this.Brand).subscribe((data:any)=>{
        timeMessage('Actualizado',1500)
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
      this.brandsData=data.dato
      console.log(this.brandsData)
    }
    ,error=>{
    });
  }
  getone(id:number):void{
    this.brandService.getone(id).subscribe((data:any)=>{
      this.Brand2=data.dato
      console.log(this.Brand2)
      this.id=data.dato.brandid
      console.log('id: '+this.id)
    }
    ,error=>{
      errorMessage('Ocurrio un problema')
    });
  }
  setBrand():void{
    this.Brand = {
      brand: this.brandsForm.get('brand')?.value,
    }
  }
  setBrand2():void{
    this.Brand2 = {
      brand: ''
    }
  }
  createForm():void{
    this.brandsForm = this.fb.group({
      brand:['',[Validators.required]]
    });
  }

}
