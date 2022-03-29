import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { errorMessage, timeMessage } from 'src/app/functions/alerts';
import { CategoryModule } from 'src/app/Models/category/category/category.module';
import { CategoryService } from 'src/app/Service/category/category.service';
import { timer, interval} from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categoryForm!:FormGroup;
  category!:CategoryModule;
  category2!:CategoryModule;
  id!:number;
  categoryData!:any[];

  constructor(public categoryService:CategoryService, public router:Router, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.createForm()
    this.getall()
    // interval(3000).subscribe(()=>{
    //   this.getall()
    // })
    this.setCategory2()
  }

  insert():void{
    if(this.categoryForm.invalid){
      return Object.values(this.categoryForm.controls).forEach(control=>{
        control.markAsTouched();
      });
    }else{
      this.setCategory();
      this.categoryService.insert(this.category).subscribe((data:any)=>{
        timeMessage('Registrado',1500)
        this.getall()
      },error=>{
        errorMessage('Ocurrio un Error')
      });
    }
  }
  update(id:number):void{
    if(this.categoryForm.invalid){
      return Object.values(this.categoryForm.controls).forEach(control=>{
        control.markAsTouched();
      });
    }else{
      this.setCategory();
      this.categoryService.update(id,this.category).subscribe((data:any)=>{
        timeMessage('Registrado',1500)
        this.getall()
      },error=>{
        errorMessage('Ocurrio un Error')
      });
    }
  }
  delete(id:number):void{
    this.categoryService.delete(id).subscribe((data:any)=>{
      timeMessage('Borrado',1500)
      this.getall()
    },error=>{
      errorMessage('Ocurrio un Error')
    });
  }
  getall():void{
    this.categoryService.getall().subscribe((data:any)=>{
      this.categoryData=data.dato
      console.log(this.categoryData)
    }
    ,error=>{
      errorMessage('Ocurrio un problema')
    });
  }
  getone(id:number):void{
    this.categoryService.getone(id).subscribe((data:any)=>{
      this.category2=data.dato
      console.log(this.category2)
      this.id=data.dato.categoryid
    }
    ,error=>{
      errorMessage('Ocurrio un problema')
    });
  }
  setCategory():void{
    this.category = {
      category: this.categoryForm.get('category')?.value,
    }
  }
  setCategory2():void{
    this.category2 = {
      category: '',
    }
  }
  createForm():void{
    this.categoryForm = this.fb.group({
      category:['',[Validators.required]]
    });
  }

}
