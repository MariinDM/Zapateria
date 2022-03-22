import { HttpClient } from '@angular/common/http';
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
    return this.http.post(`${this.serverURL}suppliers`, supplier);
  }
  update(id:number, supplier: SupplierModule): Observable<any> {
    return this.http.put(`${this.serverURL}suppliers/${id}`, supplier);
  }
  delete(id:number): Observable<any> {
    return this.http.delete(`${this.serverURL}suppliers/${id}`);
  }
  getall(): Observable<any> {
    return this.http.get(`${this.serverURL}suppliers`);
  }
  getone(id:number): Observable<any> {
    return this.http.get(`${this.serverURL}suppliers/${id}`);
  }
}
