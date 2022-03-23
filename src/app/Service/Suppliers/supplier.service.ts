import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SupplierModule } from 'src/app/Models/supplier/supplier.module';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  serverURL=environment.apiURL  
  constructor(private http:HttpClient) { }

  insert(supplier: SupplierModule): Observable<any> {
    const token:any = localStorage.getItem('token')
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
   });
    return this.http.post(`${this.serverURL}suppliers`, supplier,{headers:reqHeader});
  }
  update(id:number, supplier: SupplierModule): Observable<any> {
    const token:any = localStorage.getItem('token')
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
   });
    return this.http.put(`${this.serverURL}suppliers/${id}`, supplier,{headers:reqHeader});
  }
  delete(id:number): Observable<any> {
    const token:any = localStorage.getItem('token')
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
   });
    return this.http.delete(`${this.serverURL}suppliers/${id}`,{headers:reqHeader});
  }
  getall(): Observable<any> {
    const token:any = localStorage.getItem('token')
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
   });
    return this.http.get(`${this.serverURL}suppliers`,{headers:reqHeader});
  }
  getone(id:number): Observable<any> {
    const token:any = localStorage.getItem('token')
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
   });
   return this.http.get(`${this.serverURL}suppliers/${id}`,{headers:reqHeader});
  }
}
