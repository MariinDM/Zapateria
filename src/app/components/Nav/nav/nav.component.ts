import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timeMessage } from 'src/app/functions/alerts';
import { checkLocalStorage } from 'src/app/functions/token';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  stats!:any;

  constructor(public userService:UserService,public router:Router) { 
    let status = checkLocalStorage()
    this.stats = status;
  }

  ngOnInit(): void {
  }
  logout():void{
    this.userService.logout()
    this.router.navigate(['/login'])
    window.location.reload()
  }
}
