import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRequestService } from '../api/api-request.service';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { id } from '@swimlane/ngx-charts';

@Injectable({
  providedIn: 'root'
})
export class NewwebhookService {

  webhook = environment.emailtowebhookUrl

  constructor(private apiRequest: ApiRequestService, private http:HttpClient) { }

  getAll() : Observable<any> {

    // let _http = `EmailWebhook/EmailWebhook`
    return this.http.get(`${this.webhook}/Surecommunication/communication/EmailWebhook/EmailWebhook`); 

  }
  // postAll(data:any){


  //   let _http = `EmailWebhook/EmailWebhook`
  //   return this.http.post(_http, data)
  // }
  postAll(data: any): Observable<any> {
    return this.http.post(`${this.webhook}/Surecommunication/communication/EmailWebhook/EmailWebhook`, data);
  }

  // deleteAll(id:any){

  //   return this.http.delete(`${this.webhook}/${id}/EmailWebhook/EmailWebhook`);

  // }
  deleteById(id: number): Observable<any> {
    return this.http.delete(`${this.webhook}/Surecommunication/communication/EmailWebhook/EmailWebhook/${id}`);
  }

  updateData(id: number,data: any): Observable<any> {
    return this.http.put(`${this.webhook}/Surecommunication/communication/EmailWebhook/EmailWebhook/${id}`, data);
  }
  getDetailsById(id: number): Observable<any> {
    return this.http.get(`${this.webhook}/Surecommunication/communication/EmailWebhook/EmailWebhook/${id}`);
  }

}
