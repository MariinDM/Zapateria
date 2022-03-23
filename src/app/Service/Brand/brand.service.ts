import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrandModule } from 'src/app/Models/brand/brand/brand.module';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  serverURL=environment.apiURL
  constructor(private http:HttpClient) { }

  insert(brand: BrandModule): Observable<any> {
    const token:any = localStorage.getItem('token')
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
   });
    return this.http.post(`${this.serverURL}brands`, brand,{headers:reqHeader});
  }
  update(id:number, brand: BrandModule): Observable<any> {
    const token:any = localStorage.getItem('token')
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
   });
    return this.http.put(`${this.serverURL}brands/${id}`, brand,{headers:reqHeader});
  }
  delete(id:number): Observable<any> {
    const token:any = localStorage.getItem('token')
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
   });
    return this.http.delete(`${this.serverURL}brands/${id}`,{headers:reqHeader});
  }
  getall(): Observable<any> {
    const token:any = localStorage.getItem('token')
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
   });
    return this.http.get(`${this.serverURL}brands`,{headers:reqHeader});
  }
  getone(id:number): Observable<any> {
    const token:any = localStorage.getItem('token')
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
   });
    return this.http.get(`${this.serverURL}brands/${id}`,{headers:reqHeader});
  }
}
