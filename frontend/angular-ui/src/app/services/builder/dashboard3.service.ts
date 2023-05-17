import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { ApiRequestService } from "src/app/services/api/api-request.service";
@Injectable({
  providedIn: 'root'
})
export class Dashboard3Service {
  private getAllURL = 'get_module_id';
	private addDataURl = 'Savedata';
	private deleteFieldURL = 'delete_by_header_id';
	private getbyidURL = 'get_dashboard_headerbyid';
	private editURL = 'update_Dashbord1_Line';
  private updateURL = 'update_Dashbord1_Lineby_id';
  constructor(private _http: HttpClient,
    private apiRequest: ApiRequestService) { }
    getAll(module_id: number,page?: number, size?: number): Observable<any> {
      // create Request URL params
      let me = this;
      let params: HttpParams = new HttpParams();
      params = params.append("page", typeof page === "number" ? page.toString() : "0");
      params = params.append("size", typeof size === "number" ? size.toString() : "1000");
      params = params.append("module_id", module_id.toString());
      // get all
      return this.apiRequest.get(this.getAllURL, params);
      }

      create(data:any): Observable<any> {
      return this.apiRequest.post(this.addDataURl, data);
      }

      deleteField(id:number){
        let _http = this.deleteFieldURL + "/" + id;
          return this.apiRequest.delete(_http);
      }

      getById(id:number)
      {
        let _http = this.getbyidURL + "/" + id;
        return this.apiRequest.get(_http);
      }

      addToDB(line:any):Observable<any>
      {
       return this.apiRequest.put(this.editURL,line);
      }
      UpdateLineData(id:number, line:any)
      {
      // line = {
      //         headers: new HttpHeaders({
      //           'Content-Type': 'application/json'
      //         })
      //     };
      let _http = this.updateURL + "/" + id;
       return this.apiRequest.put(_http,line);
      }
getcount(moduleId: number):Observable<any>{
  return this.apiRequest.get(`get_dashboard/${moduleId}`);
}
}
