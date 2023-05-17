import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from '../../services/api/helper';

@Injectable({
  providedIn: 'root'
})
export class SurepipeService {

  constructor(private _http: HttpClient) { }
  public getall(){
    return this._http.get(`${baseUrl}/surepipe`);
  }
  public create(data:any){
    return this._http.post(`${baseUrl}/surepipe`,data);
  }
  public getbyid(id:any){
    return this._http.get(`${baseUrl}/get_by_wfinstanceid/${id}`);
  }
  delete(id: number) {
    //const _http = this.baseURL + "/" + id;
    return this._http.delete(`${baseUrl}/pipe/${id}`);
  }
}
