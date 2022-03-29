import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { errorMessage, timeMessage } from 'src/app/functions/alerts';
import { SizeModule } from 'src/app/Models/size/size/size.module';
import { SizeService } from 'src/app/Service/Size/size.service';
import { timer, interval} from 'rxjs';

@Component({
  selector: 'app-sizes',
  templateUrl: './sizes.component.html',
  styleUrls: ['./sizes.component.css']
})
export class SizesComponent implements OnInit {

  sizeForm!:FormGroup;
  size!:SizeModule;
  size2!:SizeModule;
  id!:number;
  sizeData!:any[];

  constructor(public sizeService:SizeService, public router:Router, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.createForm()
    this.getall()
    // interval(3000).subscribe(()=>{
    //   this.getall()
    // })
    this.setSize2()
  }
  insert():void{
    if(this.sizeForm.invalid){
      return Object.values(this.sizeForm.controls).forEach(control=>{
        control.markAsTouched();
      });
    }else{
      this.setSize();
      this.sizeService.insert(this.size).subscribe((data:any)=>{
        timeMessage('Registrado',1500)
        this.getall()
      },error=>{
        errorMessage('Ocurrio un Error')
      });
    }
  }
  update(id:number):void{
    if(this.sizeForm.invalid){
      return Object.values(this.sizeForm.controls).forEach(control=>{
        control.markAsTouched();
      });
    }else{
      this.setSize();
      this.sizeService.update(id,this.size).subscribe((data:any)=>{
        timeMessage('Registrado',1500)
        this.getall()
      },error=>{
        errorMessage('Ocurrio un Error')
      });
    }
  }
  delete(id:number):void{
    this.sizeService.delete(id).subscribe((data:any)=>{
      timeMessage('Registrado',1500)
      this.getall()
    },error=>{
      errorMessage('Ocurrio un Error')
    });
  }
  getall():void{
    this.sizeService.getall().subscribe((data:any)=>{
      this.sizeData=data.dato
      console.log(this.sizeData)
    }
    ,error=>{
      errorMessage('Ocurrio un problema')
    });
  }
  getone(id:number):void{
    this.sizeService.getone(id).subscribe((data:any)=>{
      this.size2=data.dato
      console.log(this.size2)
      this.id=data.dato.sizeid
    }
    ,error=>{
      errorMessage('Ocurrio un problema')
    });
  }
  setSize():void{
    this.size = {
      size: this.sizeForm.get('size')?.value,
    }
  }
  setSize2():void{
    this.size2 = {
      size: 0
    }
  }
  createForm():void{
    this.sizeForm = this.fb.group({
      size:[0.0,[Validators.required]]
    });
  }

}
