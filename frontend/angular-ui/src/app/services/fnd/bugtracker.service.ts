import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRequestService } from '../api/api-request.service';
import baseUrl from '../api/helper';

@Injectable({
  providedIn: 'root'
})
export class BugtrackerService {

  constructor(private _http: HttpClient,private apiRequest: ApiRequestService) { }

   public getall(){
    return this._http.get(`${baseUrl}/sureserve/bugtracker/bugtracker`);
  }
  public create(data:any){
    return this._http.post(`${baseUrl}/sureserve/bugtracker/bugtracker`,data);
  }
  create1(data:any,files:any): Observable<any> {
    const s = JSON.stringify(data);
    const formData:FormData = new FormData();
    formData.append("data",s);
    formData.append("file",files);

    return this.apiRequest.postFormData(`sureserve/bugtracker/bugtracker`,formData);
    }
  public getbyid(id:any){
    return this._http.get(`${baseUrl}/sureserve/bugtracker/bugtracker/${id}`);
  }
  delete(id: number) {
    return this._http.delete(`${baseUrl}/sureserve/bugtracker/bugtracker/${id}`);
  }
  update(id:any,data:any,files:any){
    const s = JSON.stringify(data);
    const formData:FormData = new FormData();
    formData.append("data",s);
    formData.append("file",files);

    return this.apiRequest.postFormData(`sureserve/bugtracker/bugtracker/${id}`,formData);
  }
}
