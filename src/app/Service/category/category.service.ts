import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryModule } from 'src/app/Models/category/category/category.module';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  serverURL=environment.apiURL
  constructor(private http:HttpClient) { }

  insert(category: CategoryModule): Observable<any> {
    return this.http.post(`${this.serverURL}categories`, category);
  }
  update(id:number, category: CategoryModule): Observable<any> {
    return this.http.put(`${this.serverURL}categories/${id}`, category);
  }
  delete(id:number): Observable<any> {
    return this.http.delete(`${this.serverURL}categories/${id}`);
  }
  getall(): Observable<any> {
    return this.http.get(`${this.serverURL}categories`);
  }
  getone(id:number): Observable<any> {
    return this.http.get(`${this.serverURL}categories/${id}`);
  }

}
