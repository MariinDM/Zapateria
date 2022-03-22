import { HttpClient } from '@angular/common/http';
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
    return this.http.post(`${this.serverURL}products`, product);
  }
  update(id:number, product: ProductModule): Observable<any> {
    return this.http.put(`${this.serverURL}products/${id}`, product);
  }
  delete(id:number): Observable<any> {
    return this.http.delete(`${this.serverURL}products/${id}`);
  }
  getall(): Observable<any> {
    return this.http.get(`${this.serverURL}products`);
  }
  getallcategory(): Observable<any> {
    return this.http.get(`${this.serverURL}categories`);
  }
  getallsize(): Observable<any> {
    return this.http.get(`${this.serverURL}sizes`);
  }
  getallbrand(): Observable<any> {
    return this.http.get(`${this.serverURL}brands`);
  }
  getone(id:number): Observable<any> {
    return this.http.get(`${this.serverURL}categories/${id}`);
  }
}
