import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiRequestService } from '../api/api-request.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Webhookservicesui1Service {
  //  url='EmailDatabase/EmailDatabase';
  emailtodburl = environment.emailtowebhookUrl;

  constructor(private api: ApiRequestService, private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${this.emailtodburl}/Surecommunication/communication/EmailDatabase/EmailDatabase`);

  }

  
  getDetailsById(id: number): Observable<any> {
    return this.http.get(`${this.emailtodburl}/Surecommunication/communication/EmailDatabase/EmailDatabase/${id}`);
  }

  getAllpost(data: any): Observable<any> {
    return this.http.post(`${this.emailtodburl}/Surecommunication/communication/EmailDatabase/EmailDatabase`, data);

  }

  // deleteAll(id:any){
  //   return this.http.delete(`${this.emailtodburl}/${id}//EmailDatabase/EmailDatabase`);
  // }

  // updateAll(id: number, data:any): Observable<any> {
  //  return this.http.put(`${this.emailtodburl}/${id}/EmailDatabase/EmailDatabase`);
  // }

  deleteById(id: number): Observable<any> {
    return this.http.delete(`${this.emailtodburl}/Surecommunication/communication/EmailDatabase/EmailDatabase/${id}`);
  }

  updateData(id: number,data: any): Observable<any> {
    return this.http.put(`${this.emailtodburl}/Surecommunication/communication/EmailDatabase/EmailDatabase/${id}`, data);
  }
}
  


