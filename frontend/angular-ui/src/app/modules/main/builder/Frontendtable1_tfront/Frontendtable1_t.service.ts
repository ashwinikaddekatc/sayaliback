import { Injectable } from '@angular/core';
import { HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiRequestService } from "../../../../services/api/api-request.service";
@Injectable({
  providedIn: 'root'
})
export class Frontendtable1_tservice{
  private baseURL = "Frontendtable1/Frontendtable1" ;
  private entityURL = "entityBuilder/project_builder";
  private getAllTableURL = "token/frontendtable/getall"
  private
    constructor(
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

  createProject(table:any): Observable<any> {
    return this.apiRequest.post(this.entityURL, table);
  }

  getAllProjects(): Observable<any>{
    return this.apiRequest.get(this.getAllTableURL);
  }
}