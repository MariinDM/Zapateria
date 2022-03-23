import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { map, Observable, take } from 'rxjs';
import { UserService } from '../Service/user.service';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {

  constructor(private userService:UserService,private router:Router,private cookie:CookieService){}
  // canActivate(): Observable<boolean>{
  //   return this.userService.isLogged.pipe(
  //     take(1),
  //     map((isLogged:boolean)=>!isLogged)
  //   )
  // }
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
    const cookie = this.cookie.check('token')
    return !cookie
  }
  
}
