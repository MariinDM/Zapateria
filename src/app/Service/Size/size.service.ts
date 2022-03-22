import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SizeModule } from 'src/app/Models/size/size/size.module';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SizeService {

  serverURL=environment.apiURL
  constructor(private http:HttpClient) { }

  insert(size: SizeModule): Observable<any> {
    return this.http.post(`${this.serverURL}sizes`, size);
  }
  update(id:number, size: SizeModule): Observable<any> {
    return this.http.put(`${this.serverURL}sizes/${id}`, size);
  }
  delete(id:number): Observable<any> {
    return this.http.delete(`${this.serverURL}sizes/${id}`);
  }
  getall(): Observable<any> {
    return this.http.get(`${this.serverURL}sizes`);
  }
  getone(id:number): Observable<any> {
    return this.http.get(`${this.serverURL}sizes/${id}`);
  }
}
