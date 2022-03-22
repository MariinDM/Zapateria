import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShipperModule } from 'src/app/Models/shipper/shipper.module';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ShipperService {

  serverURL=environment.apiURL

  constructor(private http:HttpClient) {}

  insert(shipper: ShipperModule): Observable<any> {
    return this.http.post(`${this.serverURL}shippers`, shipper);
  }
  update(id:number,shipper: ShipperModule): Observable<any> {
    return this.http.put(`${this.serverURL}shippers/${id}`, shipper);
  }
  delete(id:number): Observable<any> {
    return this.http.delete(`${this.serverURL}shippers/${id}`);
  }
  getall(): Observable<any> {
    return this.http.get(`${this.serverURL}shippers`);
  }
  getone(id:number): Observable<any> {
    return this.http.get(`${this.serverURL}shippers/${id}`);
  }
}
