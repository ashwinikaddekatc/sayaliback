import { Injectable } from '@angular/core';
import { ActiveTechnology } from '../../models/builder/ActiveTechnology';
import { Bcf_TechnologyStack } from '../../models/builder/Bcf_TechnologyStack';
import { Observable } from 'rxjs';
import { ApiRequestService } from '../../services/api/api-request.service';
import { HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TechnologyStackService {
  private technologyStackURL = 'api/technology-stack';
  private technologyStackURL1='api/technology_stack1';
  private technologyStackActivateURL ='api/tech-stack-active';
  private activatedTechnologyURL ='api/active-technology';
private updateelementurl='api/update_tech_element'
  constructor(private apiRequest: ApiRequestService) { }
  getAll(page?: number, size?: number): Observable<any> {
    //Create Request URL params
    let me = this;
    let params: HttpParams = new HttpParams();
    params = params.append("page", typeof page === "number" ? page.toString() : "0");
    params = params.append("size", typeof size === "number" ? size.toString() : "1000");
    // get all
    // return this.apiRequest.get('api/instructors');
    // paginated data
    return this.apiRequest.get(this.technologyStackURL, params);

  }

  getById(id: number): Observable<any> {
    const _http = this.technologyStackURL + "/" + id;
    return this.apiRequest.get(_http);
  }

  create(Bcf_TechnologyStack: Bcf_TechnologyStack): Observable<Bcf_TechnologyStack> {
    //`${this.baseURL}`
    return this.apiRequest.post(this.technologyStackURL, Bcf_TechnologyStack);
  }

  // UPLOAD ZIP FILE DATA
  saveFormAndUploadFile(formData: FormData) :Observable<any> {
    return this.apiRequest.postFormData(this.technologyStackURL, formData);
  }
// without zip data save
saveFormAndUploadFile1(formData: FormData) :Observable<any> {
  return this.apiRequest.postFormData(this.technologyStackURL1, formData);
}
updateLineById(id:number,data:any){
  let _http = this.updateelementurl + "/"+id;
  return this.apiRequest.put(_http,data);
}
  update(id: number, Bcf_TechnologyStack: Bcf_TechnologyStack): Observable<Bcf_TechnologyStack> {
    const _http = this.technologyStackURL + "/" + id;
    return this.apiRequest.put(_http, Bcf_TechnologyStack);
  }

  setActive(id: any):Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.append("id", id.toString());
    return this.apiRequest.get(this.technologyStackActivateURL, params);
  }

  getActiveTechnology(): Observable<ActiveTechnology[]> {
    return this.apiRequest.get(this.activatedTechnologyURL);
  }

  delete(id: number): Observable<any> {
    const _http = this.technologyStackURL + "/" + id;
    return this.apiRequest.delete(_http);
  }

}
