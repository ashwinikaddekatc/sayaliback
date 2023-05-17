import { Injectable } from '@angular/core';
import { Rn_Cff_ActionBuilder_Header } from 'src/app/models/builder/Rn_Cff_ActionBuilder_Header';
import { Rn_Cff_ActionBuilder_Line } from 'src/app/models/builder/Rn_Cff_ActionBuilder_Line';
import { Observable } from 'rxjs';
import { ApiRequestService } from '../api/api-request.service';
import { HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ActionBuilderService {
  private actionBuilderURL = 'api/action-builder';
  private actionBuilderLineURL = 'api/action-builder-line';
  private cffLayoutURL = 'api/cff_layout';
 // private cffDataURL = 'api/cff_data';
  private cffDataURL = 'api/build_action';
  private cffIsActive= 'api/cff-line-action';
  constructor(private apiRequest: ApiRequestService) { }

  getAll(page?: number, size?: number): Observable<any> {
    //Create Request URL params
    let params: HttpParams = new HttpParams();
    params = params.append("page", typeof page === "number" ? page.toString() : "0");
    params = params.append("size", typeof size === "number" ? size.toString() : "1000");
    return this.apiRequest.get(this.actionBuilderURL, params);
  }

  getById(id: number): Observable<Rn_Cff_ActionBuilder_Header> {
    const _http = this.actionBuilderURL + "/" + id;
    return this.apiRequest.get(_http);
  }

  create(actionBuilderHeader: Rn_Cff_ActionBuilder_Header): Observable<any> {
    //`${this.baseURL}`
    return this.apiRequest.post(this.actionBuilderURL, actionBuilderHeader);
  }

  update(id: number, actionBuilderHeader: Rn_Cff_ActionBuilder_Header): Observable<any> {
    const _http = this.actionBuilderURL + "/" + id;
    return this.apiRequest.put(_http, actionBuilderHeader);
  }

  delete(id: number): Observable<any> {
    const _http = this.actionBuilderURL + "/" + id;
    return this.apiRequest.delete(_http);
  }

  // =========== ACTION BUILDER LINE ===============
  getLinesByHeaderId(headerId: number, page?: number, size?: number): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.append("headerId", headerId.toString());
    params = params.append("page", typeof page === "number" ? page.toString() : "0");
    params = params.append("size", typeof size === "number" ? size.toString() : "1000");
    return this.apiRequest.get(this.actionBuilderLineURL, params);
  }

  getLineById(id: number): Observable<Rn_Cff_ActionBuilder_Line> {
    const _http = this.actionBuilderLineURL + "/" + id;
    return this.apiRequest.get(_http);
  }

  createLine(actionBuilderLine: Rn_Cff_ActionBuilder_Line, headerId: number): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.append('headerId',  headerId.toString());
    return this.apiRequest.post(this.actionBuilderLineURL, actionBuilderLine, params);
  }

  updateLine(id: number, actionBuilderLine: Rn_Cff_ActionBuilder_Line): Observable<any> {
    //let params: HttpParams = new HttpParams();
    //params = params.append('header_id',  header_id.toString());
    const _http = this.actionBuilderLineURL + "/" + id;
    return this.apiRequest.put(_http, actionBuilderLine);
  }

  deleteLine(id: number): Observable<any> {
    const _http = this.actionBuilderLineURL + "/" + id;
    return this.apiRequest.delete(_http);
  }

  // CFF LAYOUT AND DATA
  cffLayOut(headerId: number): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.append('headerId',  headerId.toString());
    return this.apiRequest.get(this.cffLayoutURL, params);
  }
  cffData(headerId: number): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.append('headerId',  headerId.toString());
    return this.apiRequest.get(this.cffDataURL, params);
  }

  setActive(id: any):Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.append("id", id.toString());
    return this.apiRequest.get(this.cffIsActive, params);
  }



  actioninsert(param1,methodname):Observable<any>
  {
    let params: HttpParams = new HttpParams();
    params = params.append("label1", param1.toString());
    let url="api/"+methodname+"_method";
    console.log(url);
    return this.apiRequest.get(url, params);
  }


  actionupdate(id,param1,methodname):Observable<any>
  {
    let params: HttpParams = new HttpParams();
    params = params.append("id", id);
    params = params.append("label1", param1.toString());
    let url="api/"+methodname+"_method";
    console.log(url);
    return this.apiRequest.get(url, params);
  }

}
