import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    const token:any = localStorage.getItem('token')
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
   });
    return this.http.post(`${this.serverURL}categories`, category,{headers:reqHeader});
  }
  update(id:number, category: CategoryModule): Observable<any> {
    const token:any = localStorage.getItem('token')
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
   });
    return this.http.put(`${this.serverURL}categories/${id}`, category,{headers:reqHeader});
  }
  delete(id:number): Observable<any> {
    const token:any = localStorage.getItem('token')
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
   });
    return this.http.delete(`${this.serverURL}categories/${id}`,{headers:reqHeader});
  }
  getall(): Observable<any> {
    const token:any = localStorage.getItem('token')
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
   });
    return this.http.get(`${this.serverURL}categories`,{headers:reqHeader});
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
