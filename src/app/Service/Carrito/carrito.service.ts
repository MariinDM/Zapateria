import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carrito } from 'src/app/Models/carrito';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  serverURL=environment.apiURL
  constructor(private http:HttpClient) { }

  insert(carrito: Carrito): Observable<any> {
    const token:any = localStorage.getItem('token')
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
   });
    return this.http.post(`${this.serverURL}carrito`, carrito,{headers:reqHeader});
  }
  update(): Observable<any> {
    const token:any = localStorage.getItem('token')
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
   });
    return this.http.put(`${this.serverURL}carrito/1`,{headers:reqHeader});
  }
  delete(id:number): Observable<any> {
    const token:any = localStorage.getItem('token')
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
   });
    return this.http.delete(`${this.serverURL}carrito/${id}`,{headers:reqHeader});
  }
  getall(): Observable<any> {
    const token:any = localStorage.getItem('token')
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
   });
    return this.http.get(`${this.serverURL}carrito`,{headers:reqHeader});
  }
  getone(id:number): Observable<any> {
    const token:any = localStorage.getItem('token')
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
   });
    return this.http.get(`${this.serverURL}carrito/${id}`,{headers:reqHeader});
  }
}
