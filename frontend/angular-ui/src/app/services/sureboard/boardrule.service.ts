import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from 'src/app/services/api/helper';
import { Observable } from "rxjs";
import { ApiRequestService } from "src/app/services/api/api-request.service";
@Injectable({
  providedIn: 'root'
})
export class BoardruleService {
  private baseURL = "ruleboard";
  constructor(private _http: HttpClient,
    private apiRequest: ApiRequestService,) { }
  // create board
  public createBoard(board: any){
    return this._http.post(`${baseUrl}/ruleboard`, board);
  }

  // update board
  public updateBoard(board: any,id:number){
    return this._http.put(`${baseUrl}/ruleboard/${id}`, board);
  }
  update(id: number, data: any): Observable<any> {
    const _http = this.baseURL + "/" + id;
    return this.apiRequest.put(_http, data);
  }
  // get all boards
  public getAllBoards(){
    return this._http.get(`${baseUrl}/ruleboard`);
  }

  // get one board
  public getOneBoard(Id: any){
    return this._http.get(`${baseUrl}/ruleboard/${Id}`);
  }

  // delete board
  public deleteBoard(id: any){
    return this._http.delete(`${baseUrl}/ruleboard/${id}`);
  }
  public addBoard(board: any){
    return this._http.post(`${baseUrl}/api/addBoardClmnsPrj`, board);
  }
}
