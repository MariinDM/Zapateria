import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { UserModule } from '../Models/user/user.module';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  serverURL=environment.apiURL
  constructor(private http:HttpClient,private cookies:CookieService) { }

  login(user:UserModule):Observable<any>{
    return this.http.post(`${this.serverURL}api/v1/users/login`, user);
  }
  register(user: UserModule): Observable<any> {
    return this.http.post(`${this.serverURL}api/v1/users/register`, user);
  }
  setToken(token: string) {
    this.cookies.set("token",token);
  }
  getToken() {
    return this.cookies.get("token");
  }
  getUser() {
    return this.http.get("https://reqres.in/api/users/2");
  }
  getUserLogged() {
    const token = this.getToken();
    // Aquí iría el endpoint para devolver el usuario para un token
  }
}
