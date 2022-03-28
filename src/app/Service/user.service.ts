import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { UserModule } from '../Models/user/user.module';
import { environment } from 'src/environments/environment.prod';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';

//const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class UserService {

  serverURL=environment.apiURL

  private loggedIn= new BehaviorSubject<boolean>(false);

  get isLogged():Observable<boolean>{
    return this.loggedIn.asObservable()
  }

  constructor(private http:HttpClient,private cookie:CookieService) { 
    // this.checkToken()
  }

  login(user:UserModule):Observable<any>{
    return this.http.post(`${this.serverURL}users/login`, user)
    .pipe(
      map((res:any)=>{
        this.saveToken(res.token.token,res.userLevel)
        this.loggedIn.next(true)
        console.log(res)
        return res
      }),
      catchError((err)=>this.handlerError(err))
    );
  }
  // private checkToken():void{
  //   const userToken:any = localStorage.getItem('token')
  //   const isExpired = helper.isTokenExpired(userToken)
  //   console.log(isExpired)
    
  //   isExpired ? this.logout() : this.loggedIn.next(true)
  // }

  private saveToken(token:string,access:string):void{
    localStorage.setItem("token",token)
    this.cookie.set('token',token)
    localStorage.setItem("access",access)
    this.cookie.set('access',access)
  }

  private handlerError(err:any):Observable<never>{
    let errorMessage = `Ocurrio un Error`;
    if(err){
      errorMessage=`Error: code ${err.mesagge}`;
    }
    window.alert(errorMessage)
    return throwError(errorMessage)
  }

  logout():void{
    const token:any = localStorage.getItem('token')
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
   });
    localStorage.removeItem('token')
    localStorage.removeItem('access')
    this.http.post(`${this.serverURL}users/logout`,token)
    this.cookie.delete('token')
    this.loggedIn.next(false)
  }
  register(user: UserModule): Observable<any> {
    return this.http.post(`${this.serverURL}users/register`, user);
  }
}
