import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import baseUrl from 'src/app/services/api/helper';
import { ApiRequestService } from '../api/api-request.service';
import { AnyRecord } from 'dns';
@Injectable({
  providedIn: 'root'
})
export class CardServiceService {

  constructor(private _http: HttpClient,
    private apiRequest: ApiRequestService,) { }
  // create card
  public createCard(card: any){
    return this._http.post(`${baseUrl}/cards/create`, card);
  }

  // create card
  public updateCard(card: any){
    return this._http.put(`${baseUrl}/cards/update`, card);
  }

  // get all cards
  public getAllCards(){
    return this._http.get(`${baseUrl}/cards/get-all`);
  }

  // get one card
  public getOneCard(cid: any){
    return this._http.get(`${baseUrl}/cards/get-one/${cid}`);
  }

  // delete card
  public deleteCard(cid: any){
    return this._http.delete(`${baseUrl}/cards/delete/${cid}`);
  }

  // get cards of perticular column
  public getCardsOfColumn(colunmId: any){
    return this._http.get(`${baseUrl}/cards/column/${colunmId}`);
  }

  public getownedby(assigned_to:any,b_id:any){
    const params = new HttpParams()
    .set('assigned_to', assigned_to)
    .set('b_id',b_id)
    return this.apiRequest.get(`get_all_owned_by`,params);
  }
  public getrequestedby(requested_by:any,b_id:any){
    const params = new HttpParams()
    .set('requested_by', requested_by)
    .set('b_id',b_id)
    return this.apiRequest.get(`requestedby`,params);
  }
  public getworkinprogress(b_id:any){
    const params = new HttpParams()
    .set('b_id',b_id)
    return this.apiRequest.get(`ByCname`,params);
  }
  public getlastweek(sysdate:any){
    const params=new HttpParams()
    .set('date',sysdate)
    return this.apiRequest.get(`api`,params);
  }
  public lastmonth(sysdate:any){
    const params=new HttpParams()
    .set('date',sysdate)
    return this.apiRequest.get(`api`,params);
  }

  // get all cards
  public getAllGoals(bid:any){
    return this._http.get(`${baseUrl}/formio/category/get_bygoal_byid/${bid}`);
  }
  public getAllMilestone(){
    return this._http.get(`${baseUrl}/cards/getby1`);
  }
  public getAllIteration(){
    return this._http.get(`${baseUrl}/cards/getby2`);
  }
}
