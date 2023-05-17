import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from '../api/helper'
import { Observable } from 'rxjs';
import { ApiRequestService } from '../api/api-request.service';
@Injectable({
  providedIn: 'root'
})
export class WireframeLineService {

  constructor(private _http: HttpClient, private apiRequest:ApiRequestService) { }
  public addToDB(line: any){
    return this._http.post(`${baseUrl}/r/create`, line);
  }

  public getOneFromDBById(id: any){
    return this._http.get(`${baseUrl}/r/get-one/${id}`);
  }

  public getAllLines(){
    return this._http.get(`${baseUrl}/r/get-all`);
  }

  public updateOneLine(line: any){
    return this._http.put(`${baseUrl}/r/update`, line);
  }
  getseedetails(): Observable<any> {
    return this._http.get(`${baseUrl}/token/frontendtable/getall`);
   }

  getAllwireframes(id:number):Observable<any>{
    return this._http.get(`${baseUrl}/formdrag/wireframe/getallwireframe_table/${id}`);
  }

  getColumnList(projId: number, tableName: string): Observable<any> {
    const url = `${baseUrl}/formdrag/wireframe/columnlistofwireframe/${projId}/${tableName}`;
    return this._http.get(url);
  }

//==============wf_library===============//

addToLibrary(id: number): Observable<any> {
  return this.apiRequest.get(`wflibrary/copylib/copy_library/${id}`);
}
  
}
