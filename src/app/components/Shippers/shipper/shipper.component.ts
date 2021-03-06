import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { errorMessage, timeMessage } from 'src/app/functions/alerts';
import { checkLocalStorage } from 'src/app/functions/token';
import { ShipperModule } from 'src/app/Models/shipper/shipper.module';
import { ShipperService } from 'src/app/Service/Shippers/shipper.service';
import { timer, interval} from 'rxjs';

@Component({
  selector: 'app-shipper',
  templateUrl: './shipper.component.html',
  styleUrls: ['./shipper.component.css']
})
export class ShipperComponent implements OnInit {
  shipperForm!:FormGroup;
  shipper!:ShipperModule;
  shipper2!:ShipperModule;
  shipperData!:any[];
  constructor(public shipperService:ShipperService, public router:Router, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.getall()
    // interval(3000).subscribe(()=>{
    //   this.getall()
    // })
    this.createForm()
    this.setShipper2()
  }
  insert():void{
    if(this.shipperForm.invalid){
      return Object.values(this.shipperForm.controls).forEach(control=>{
        control.markAsTouched();
      });
    }else{
      this.setShipper();
      this.shipperService.insert(this.shipper).subscribe((data:any)=>{
        timeMessage('Registrado',1500)
        this.getall()
      },error=>{
        errorMessage('Ocurrio un problema')
      });
    }
  }
  update(id:number):void{
    if(this.shipperForm.invalid){
      return Object.values(this.shipperForm.controls).forEach(control=>{
        control.markAsTouched();
      });
    }else{
      this.setShipper();
      this.shipperService.update(id,this.shipper).subscribe((data:any)=>{
        timeMessage('Actualizado',1500)
        this.getall()
        this.createForm()
      },error=>{
        errorMessage('Ocurrio un Error')
      });
    }
  }
  delete(id:number):void{
    this.shipperService.delete(id).subscribe((data:any)=>{
      timeMessage('Borrado',1500)
      this.getall()
    },error=>{
      errorMessage('Ocurrio un Error')
    });
  }
  getall():void{
    this.shipperService.getall().subscribe((data:any)=>{
      this.shipperData=data.dato
      console.log(this.shipperData)
    }
    ,error=>{
      
    });
  }
  getone(id:number):void{
    this.shipperService.getone(id).subscribe((data:any)=>{
      this.shipper2=data.dato
      console.log(this.shipper2)
    }
    ,error=>{
      errorMessage('Ocurrio un problema')
    });
  }

  setShipper():void{
    this.shipper = {
      shipper: this.shipperForm.get('shipper')?.value,
      phone: this.shipperForm.get('phone')?.value,
    }
  }
  setShipper2():void{
    this.shipper2 = {
      shipper: '',
      phone: ''
    }
  }

  get getEmail(){
    return this.shipperForm.get('name') && this.shipperForm.get('name')?.touched
  }
  get getPassword(){
    return this.shipperForm.get('phone') && this.shipperForm.get('phone')?.touched
  }

  createForm():void{
    this.shipperForm = this.fb.group({
      shipper:['',[Validators.required]],
      phone:['',[Validators.required]],
    });
  }


}
