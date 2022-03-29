import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { errorMessage, timeMessage } from 'src/app/functions/alerts';
import { checkLocalStorage } from 'src/app/functions/token';
import { SupplierModule } from 'src/app/Models/supplier/supplier.module';
import { SupplierService } from 'src/app/Service/Suppliers/supplier.service';
import { timer, interval} from 'rxjs';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {
  supplierForm!:FormGroup;
  supplier!:SupplierModule;
  supplier2!:SupplierModule;
  id!:number;
  supplierData!:any[];
  constructor(public supplierService:SupplierService, public router:Router, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.getall()
    this.createForm()
    // interval(3000).subscribe(()=>{
    //   this.getall()
    // })
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
        this.getall()
      },error=>{
        errorMessage('Ocurrio un Error')
      });
    }
  }
  delete(id:number):void{
    this.supplierService.delete(id).subscribe((data:any)=>{
      timeMessage('Borrado',1500)
      this.getall()
    },error=>{
      errorMessage('Ocurrio un Error')
    });
  }
  getall():void{
    this.supplierService.getall().subscribe((data:any)=>{
      this.supplierData=data.dato
      console.log(this.supplierData)
    }
    ,error=>{
    });
  }
  getone(id:number):void{
    this.supplierService.getone(id).subscribe((data:any)=>{
      this.supplier2=data.dato
      console.log(this.supplier2)
      this.id=data.dato.supplierid
      console.log('id: '+this.id)
    }
    ,error=>{
      errorMessage('Ocurrio un problema')
    });
  }
  setSupplier():void{
    this.supplier = {
      supplier: this.supplierForm.get('supplier')?.value,
      email: this.supplierForm.get('email')?.value,
      phone: this.supplierForm.get('phone')?.value,
    }
  }
  setSupplier2():void{
    this.supplier2 = {
      supplier: '',
      email: '',
      phone: '',
    }
  }

  createForm():void{
    this.supplierForm = this.fb.group({
      supplier:['',[Validators.required]],
      email:['',[Validators.required]],
      phone:['',[Validators.required]],
    });
  }

}
