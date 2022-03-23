import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModule } from 'src/app/Models/Product/product/product.module';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  serverURL=environment.apiURL
  constructor(private http:HttpClient) { }

  insert(product: ProductModule): Observable<any> {
    const token:any = localStorage.getItem('token')
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
   });
    return this.http.post(`${this.serverURL}products`, product,{headers:reqHeader});
  }
  update(id:number, product: ProductModule): Observable<any> {
    const token:any = localStorage.getItem('token')
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
   });
    return this.http.put(`${this.serverURL}products/${id}`, product,{headers:reqHeader});
  }
  delete(id:number): Observable<any> {
    const token:any = localStorage.getItem('token')
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
   });
    return this.http.delete(`${this.serverURL}products/${id}`,{headers:reqHeader});
  }
  getall(): Observable<any> {
    const token:any = localStorage.getItem('token')
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
   });
    return this.http.get(`${this.serverURL}products`,{headers:reqHeader});
  }
  getallcategory(): Observable<any> {
    const token:any = localStorage.getItem('token')
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
   });
    return this.http.get(`${this.serverURL}categories`,{headers:reqHeader});
  }
  getallsize(): Observable<any> {
    const token:any = localStorage.getItem('token')
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
   });
    return this.http.get(`${this.serverURL}sizes`,{headers:reqHeader});
  }
  getallbrand(): Observable<any> {
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
    return this.http.get(`${this.serverURL}categories/${id}`,{headers:reqHeader});
  }
}
