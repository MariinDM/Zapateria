import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResponse, UserModule } from 'src/app/Models/user/user.module';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  serverURL=environment.apiURL  
  constructor(private http:HttpClient) { }

  // insert(suppluserier: SupplierModule): Observable<any> {
  //   const token:any = localStorage.getItem('token')
  //   const reqHeader = new HttpHeaders({ 
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${token}`
  //  });
  //   return this.http.post(`${this.serverURL}suppliers`, supplier,{headers:reqHeader});
  // }
  update(id:number, user: UserModule): Observable<any> {
    const token:any = localStorage.getItem('token')
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
   });
    return this.http.put(`${this.serverURL}users/${id}`, user,{headers:reqHeader});
  }
  // delete(id:number): Observable<any> {
  //   const token:any = localStorage.getItem('token')
  //   const reqHeader = new HttpHeaders({ 
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${token}`
  //  });
  //   return this.http.delete(`${this.serverURL}suppliers/${id}`,{headers:reqHeader});
  // }
  getall(): Observable<any> {
    const token:any = localStorage.getItem('token')
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
   });
    return this.http.get(`${this.serverURL}users`,{headers:reqHeader});
  }
  getone(id:number): Observable<any> {
    const token:any = localStorage.getItem('token')
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
   });
   return this.http.get(`${this.serverURL}users/${id}`,{headers:reqHeader});
  }
}
