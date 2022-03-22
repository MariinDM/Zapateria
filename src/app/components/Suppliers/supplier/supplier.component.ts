import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { errorMessage, timeMessage } from 'src/app/functions/alerts';
import { SupplierModule } from 'src/app/Models/supplier/supplier.module';
import { SupplierService } from 'src/app/Service/Suppliers/supplier.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {
  supplierForm!:FormGroup;
  supplier!:SupplierModule;
  supplier2!:SupplierModule;
  supplierData!:any[];
  constructor(public supplierService:SupplierService, public router:Router, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.createForm()
    this.getall()
    this.setSupplier2()
  }
  insert():void{
    if(this.supplierForm.invalid){
      return Object.values(this.supplierForm.controls).forEach(control=>{
        control.markAsTouched();
      });
    }else{
      this.setSupplier();
      this.supplierService.insert(this.supplier).subscribe((data:any)=>{
        timeMessage('Registrado',1500)
        this.router.navigate(['/suppliers']);
        this.getall()
        this.createForm()
      },error=>{
        errorMessage('Ocurrio un Error')
      });
    }
  }
  update(id:number):void{
    if(this.supplierForm.invalid){
      return Object.values(this.supplierForm.controls).forEach(control=>{
        control.markAsTouched();
      });
    }else{
      this.setSupplier();
      this.supplierService.update(id,this.supplier).subscribe((data:any)=>{
        timeMessage('Registrado',1500)
        this.router.navigate(['/suppliers']);
        this.getall()
      },error=>{
        errorMessage('Ocurrio un Error')
      });
    }
  }
  delete(id:number):void{
    this.supplierService.delete(id).subscribe((data:any)=>{
      timeMessage('Registrado',1500)
      this.getall()
    },error=>{
      errorMessage('Ocurrio un Error')
    });
  }
  getall():void{
    this.supplierService.getall().subscribe((data:any)=>{
      this.supplierData=data.suppliers
      console.log(this.supplierData)
    }
    ,error=>{
      errorMessage('Ocurrio un problema')
    });
  }
  getone(id:number):void{
    this.supplierService.getone(id).subscribe((data:any)=>{
      this.supplier2=data.suppliers
      console.log(this.supplier2)
    }
    ,error=>{
      errorMessage('Ocurrio un problema')
    });
  }
  setSupplier():void{
    this.supplier = {
      name: this.supplierForm.get('name')?.value,
      email: this.supplierForm.get('email')?.value,
      phone: this.supplierForm.get('phone')?.value,
    }
  }
  setSupplier2():void{
    this.supplier2 = {
      name: '',
      email: '',
      phone: '',
    }
  }

  get getEmail(){
    return this.supplierForm.get('name') && this.supplierForm.get('name')?.touched
  }
  get getPassword(){
    return this.supplierForm.get('phone') && this.supplierForm.get('phone')?.touched
  }

  createForm():void{
    this.supplierForm = this.fb.group({
      name:['',[Validators.required]],
      email:['',[Validators.required]],
      phone:['',[Validators.required]],
    });
  }

}
