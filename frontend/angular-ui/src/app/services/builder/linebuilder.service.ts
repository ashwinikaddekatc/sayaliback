import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { ApiRequestService } from "src/app/services/api/api-request.service";

@Injectable({
  providedIn: 'root'
})
export class LinebuilderService {

  constructor(private http: HttpClient,
    private apiRequest: ApiRequestService) { }

    saveData(data: any): Observable<any> {
      return this.apiRequest.post('listbuilder/lb/Savedata', data);
    }
  
    getDetails(): Observable<any> {
      return this.apiRequest.get('listbuilder/lb/get_lb_header');
    }
  
    getAllLines(): Observable<any> {
      return this.apiRequest.get('listbuilder/lb/get_all_lines');
    }
  
    getModuleById(moduleId: number): Observable<any> {
      return this.apiRequest.get(`listbuilder/lb/get_module_id?module_id=${moduleId}`);
    }
  
    getDetailsById(id: number): Observable<any> {
      return this.apiRequest.get(`listbuilder/lb/get_lb_headerbyid/${id}`);
    }
  
    updateHeader(data: any): Observable<any> {
      return this.apiRequest.put('listbuilder/lb/update_lb_header', data);
    }
  
    updateLineById(id: number, data: any): Observable<any> {
      return this.apiRequest.put(`listbuilder/lb/update_Lb_Lineby_id/${id}`, data);
    }
  
    updateLine(data: any): Observable<any> {
      return this.apiRequest.post('listbuilder/lb/update_Lb_Line', data);
    }
  
    deleteById(id: number): Observable<any> {
      return this.apiRequest.delete(`listbuilder/lb/delete_by_header_id/${id}`);
    }
  
    getLinecount(moduleId: number):Observable<any>{
      return this.apiRequest.get(`listbuilder/lb/get_listbuilder/${moduleId}`);
    }
  
    getObject(): Observable<any> {
      return this.apiRequest.get('listbuilder/lb/getobject');
    }

   
}
