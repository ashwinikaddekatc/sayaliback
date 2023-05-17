import { Injectable } from '@angular/core';
import { HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiRequestService } from "../../../../services/api/api-request.service";
@Injectable({
  providedIn: 'root'
})
export class Gaurav_testing_tservice{
  private baseURL = "Gaurav_testing/Gaurav_testing" ;  constructor(
    private apiRequest: ApiRequestService,
  ) { }
  getAll(page?: number, size?: number): Observable<any> {
    return this.apiRequest.get(this.baseURL);
  }
  getById(id: number): Observable<any> {
    const _http = this.baseURL + "/" + id;
    return this.apiRequest.get(_http);
  }
  create(data: any): Observable<any> {
    return this.apiRequest.post(this.baseURL, data);
  }
  update(id: number, data: any): Observable<any> {
    const _http = this.baseURL + "/" + id;
    return this.apiRequest.put(_http, data);
  }
  delete(id: number): Observable<any> {
    const _http = this.baseURL + "/" + id;
    return this.apiRequest.delete(_http);
  }
}