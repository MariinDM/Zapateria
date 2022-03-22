import { HttpClient } from '@angular/common/http';
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
    return this.http.post(`${this.serverURL}brands`, brand);
  }
  update(id:number, brand: BrandModule): Observable<any> {
    return this.http.put(`${this.serverURL}brands/${id}`, brand);
  }
  delete(id:number): Observable<any> {
    return this.http.delete(`${this.serverURL}brands/${id}`);
  }
  getall(): Observable<any> {
    return this.http.get(`${this.serverURL}brands`);
  }
  getone(id:number): Observable<any> {
    return this.http.get(`${this.serverURL}brands/${id}`);
  }
}
