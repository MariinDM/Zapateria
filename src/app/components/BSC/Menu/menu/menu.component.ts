import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { checkLocalStorage } from 'src/app/functions/token';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  brandForm!:FormGroup;
  categoryForm!:FormGroup;
  sizeForm!:FormGroup;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

}
