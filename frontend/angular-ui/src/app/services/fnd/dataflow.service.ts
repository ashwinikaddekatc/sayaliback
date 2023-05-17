import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseUrl from 'src/app/services/api/helper';
import { environment } from 'src/environments/environment';
import { ApiRequestService } from '../api/api-request.service';
@Injectable({
  providedIn: 'root'
})
export class DataflowService {
  baseurl = environment.surejobUrl;
 private addDataURl = 'api/suredata';
  constructor(private _http: HttpClient,private apiRequest: ApiRequestService) { }
   public getAll() {
    return this._http.get(`${baseUrl}/dataflow/dataflow`);
  }
  public create(data: any){
    return this._http.post(`${baseUrl}/dataflow/dataflow`, data);
  }
  create1(data:any,files:any): Observable<any> {
    const s = JSON.stringify(data);
    const formData:FormData = new FormData();
    formData.append("data",s);
    formData.append("ssh_file_key",files);
    // for(let i=0;i<files.length;i++){
    //   console.log("here");
    //   formData.append(files[i].name,files[i]);
    // }
    //console.log(formData.get("attachmentFile0"))
    return this.apiRequest.postFormData(this.addDataURl,formData);

   // return this.apiRequest.post(this.addDataURl, data);
    }
  public getById(id: any){
    return this._http.get(`${baseUrl}/dataflow/dataflow/${id}`);
  }
  public getsourcedata(id: number):Observable<any>{
    return this._http.get(`${baseUrl}/suredata/suredataflow/tablelistfromsource/${id}`);
  }
  public getstoredata(id:number):Observable<any>{
    return this._http.get(`${baseUrl}/suredata/suredataflow/tablelistfromstore/${id}`);
  }
  public delete(id:any){
    return this._http.delete(`${baseUrl}/dataflow/dataflow/${id}`);
  }

  public update(id:any,data:any){
    return this._http.put(`${baseUrl}/dataflow/dataflow/${id}`, data);
  }
  public updatelines(id:any,data:any){
    return this._http.put(`${baseUrl}/dataflow/dataflow_line/update/${id}`,data);
  }
  // public getdataflowlines(){
  //   return this._http.get(`${baseUrl}/dataflow/dataflow_line/getall`);
  // }

  
  condition:string = '';
  setCondition(condition: string) {
    this.condition = condition;
  }
  
  getCondition(): string {
    return this.condition;
  }

  datacondition: string = '';
  setDataCondition(condition: string) {
    this.datacondition = condition;
  }

  getDataCondition(): string {
    return this.datacondition;
  }


  public createjob(id:any){
    return this._http.get(`${baseUrl}/token/suredata/surejob/create_job/${id}`);
  }
//surejob
  public getAllsurejob(line_id:any) {
    return this._http.get(`${this.baseurl}/surejob/getalljob/${line_id}`);
  }
  public createsceduler(data: any){
    return this._http.post(`${this.baseurl}/surejob/schedule`, data);
  }
  public updatesurejob(data: any){
    return this._http.post(`${this.baseurl}/surejob/schedule`, data);
  }
  public pause(data:any){
    return this._http.post(`${this.baseurl}/surejob/pauseschedule`, data);
  }
  public runonce(data:any){
    return this._http.post(`${this.baseurl}/surejob/runschedule`, data);
  }
  public resume(data:any){
    return this._http.post(`${this.baseurl}/surejob/resumeschedule`, data);
  }
  public deletesurejob(val:any){
    return this._http.delete(`${this.baseurl}/surejob/deleteschedule/${val}`,);
  }

  /////////////// data flow 3 ///////////////

  getColumnListFromSourceTable(id: number, tableName: string): Observable<any> {
    return this.apiRequest.get(`suredata/suredataflow3/columnlistfromSource/${id}/${tableName}`);
  }
  getColumnListFromStoreTable(id: number, tableName: string): Observable<any> {
    return this.apiRequest.get(`suredata/suredataflow3/columnlistfromStore/${id}/${tableName}`);
  }
}
