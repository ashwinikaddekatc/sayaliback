import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from 'src/app/services/api/helper';
import { Observable } from "rxjs";
import { ApiRequestService } from "src/app/services/api/api-request.service";
@Injectable({
  providedIn: 'root'
})
export class ColumnServiceService {

createurl="cols/board"

  constructor(private _http: HttpClient,
    private apiRequest: ApiRequestService,) { }
  // create column
  public createcolumn(column: any){
    return this._http.post(`${baseUrl}/cols/create`, column);
  }


  // update column
  public updatecolumn(column: any){
    return this._http.put(`${baseUrl}/cols/update`, column);
  }

  // get all columns
  public getAllColumns(){
    return this._http.get(`${baseUrl}/cols/get-all`);
  }

  // get one column
  public getOneColumn(cid: any){
    return this._http.get(`${baseUrl}/cols/get-one/${cid}`);
  }

  // delete column
  public deleteColumn(cid: any){
    return this._http.delete(`${baseUrl}/cols/delete/${cid}`);
  }

  // get columns of perticular board
  public getColumnsOfBoard(bid: any){
    return this._http.get(`${baseUrl}/cols/board/${bid}`);
  }

}
