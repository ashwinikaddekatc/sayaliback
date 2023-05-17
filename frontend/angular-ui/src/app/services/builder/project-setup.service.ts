import { Injectable } from '@angular/core';
import { ProjectSetup } from "../../models/builder/Project_setup";
import { forkJoin, Observable } from "rxjs";
import { ApiRequestService } from "../api/api-request.service";
import { HttpParams } from "@angular/common/http";
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import baseUrl from 'src/app/services/api/helper';
@Injectable({
  providedIn: 'root'
})
export class ProjectSetupService {
  private baseURL = "api/project-setup";
  //private copyProjectURL = 'api/project-list';
  private copyProjectURL = 'api/project-copy';
  private recenmodiurl = 'api/getAllRecentPrjs';
  private recentarchivedurl = 'api/getAllArchivedPrjs';
  private allfavurl='api/getAllFavPrjsdet';
  private getalluserid='api/GetAllByUserId';
  private addboardandprourl='api/addBoardClmnsOther';
  private getrepourl ='api/getmodulename';
  private copydeployurl='api/Git_copy';
  data: any;
  obj:any;
  private storage: Storage = sessionStorage;
  constructor(private apiRequest: ApiRequestService,
    private http: HttpClient) { this.getAll().subscribe(data => {}, error => console.log(error));
 localStorage.setItem('project',JSON.stringify(this.data));
     }

  getAll(page?: number, size?: number): Observable<any> {
    //Create Request URL params
    let params: HttpParams = new HttpParams();
    params = params.append("page", typeof page === "number" ? page.toString() : "0");
    params = params.append("size", typeof size === "number" ? size.toString() : "1000");
    //const _http = this.baseURL + '/all';
    return this.apiRequest.get(this.baseURL, params);
  }
  getallmyproject(): Observable<any>{
    return this.apiRequest.get(`fnd/project/myproject`);
  }
getalljson(){

  return this.http.get('../assets/data/data.json').pipe
      (map(data => {
        this.data = data;
        console.log(data);
      }, err => {
        if (err) {
          return err.json();
        }
      }));
  return this.apiRequest.get(this.baseURL);
}
  getById(id: number): Observable<ProjectSetup> {
    const _http = this.baseURL + "/" + id;
    return this.apiRequest.get(_http);
  }


  create(projectSetup: ProjectSetup): Observable<any> {
    return this.apiRequest.post(this.baseURL, projectSetup);
  }

  update(id: number, projectSetup: ProjectSetup): Observable<any> {
    const _http = this.baseURL + "/" + id;
    return this.apiRequest.put(_http, projectSetup);
  }

  copy(projectCopyForm: Object) :Observable<any> {
    return this.apiRequest.post(this.copyProjectURL, projectCopyForm);
  }
  delete(id: number): Observable<any> {
    const _http = this.baseURL + "/" + id;
    return this.apiRequest.delete(_http);
  }

//recently modify
  getallrecentmodify(id: number): Observable<any> {
    const _http = this.recenmodiurl + "/" + id;
    return this.apiRequest.get(_http);
  }
  getallrecentarchived(id:number): Observable<any>{
    const _http = this.recentarchivedurl + "/" + id;
    return this.apiRequest.get(_http);
  }
  getallfav(id:number): Observable<any>{
    const _http = this.allfavurl + "/" + id;
    return this.apiRequest.get(_http);
  }
  getallsharedwithme(): Observable<any>{
    return this.apiRequest.get(`workspace/secworkspaceuser/sharedwithme`);
  }
  getallbyuserid(id:number): Observable<any>{
    const _http = this.getalluserid + "/" + id;
    return this.apiRequest.get(_http);
  }
  public sample(data1,data2): Observable<any[]>{
  let call1=this.apiRequest.post(this.baseURL, data1)
  let call2=this.apiRequest.post(this.addboardandprourl,data2)
   return forkJoin([call1, call2]);
}

getprojectname(){
  return this.http.get(`${baseUrl}/api/getprojectname`);
}
getreponame(projectId:any,page?: number, size?: number){
  let params: HttpParams = new HttpParams();
    params = params.append("projectId", projectId.toString());
    params = params.append("page", typeof page === "number" ? page.toString() : "0");
    params = params.append("size", typeof size === "number" ? size.toString() : "1000");
    return this.apiRequest.get(this.getrepourl, params);
  //return this.http.get(`${baseUrl}/api/getmodulename`,params);
}
getmilstonename(){
  return this.http.get(`${baseUrl}/milestonename`);
}
getiterationname(){
  return this.http.get(`${baseUrl}/iterationname`);
}
getgoalname(){
  return this.http.get(`${baseUrl}/goalname`);
}
getpmusername(){
  return this.http.get(`${baseUrl}/pmusername`);
}
getallteam(){
  return this.http.get(`${baseUrl}/Sec_team`);
}
getallreport(){
  return this.http.get(`${baseUrl}/Report_to`);
}
getallassign(){
  return this.http.get(`${baseUrl}/Assign`);
}
getallrequestor(){
  return this.http.get(`${baseUrl}/Requestor`);
}
getallowner(){
  return this.http.get(`${baseUrl}/Owner`);
}
getalltype(){
  return this.http.get(`${baseUrl}/DD_type`);
}

public build(Id: any){
  return this.apiRequest.get(`entityBuilder/BuildByProject/${Id}`);
}
private pdata: string = "pdata";
public storeaddeditvalues(pdata:any,) {
   this.storage.setItem(this.pdata,JSON.stringify (pdata));
   //console.log(this.data);
}
getdata(): any {
  //console.log(this.data);
  var pdata = JSON.parse(this.storage.getItem(this.pdata));
  //let data = this.storage.getItem(this.data);
    return pdata;
}
copydeployment(projectId:any,deployment:any,msg: any,newprojectname:any,repo_cond:any){
  let params: HttpParams = new HttpParams();
    params =params.append("copy_from",projectId);
    params =params.append("Deployment_profile",deployment);
    params =params.append("commit_msg",msg);
    params =params.append("newproject_name",newprojectname),
    params=params.append("repo_cond",repo_cond)
    return this.http.post(`${baseUrl}/api/Git_copy`,params);
    //return this.apiRequest.post(this.copydeployurl,params);
  //return this.http.get(`${baseUrl}/api/getmodulename`,params);

}
private gitiareponame: string = "data";
public storeaddedgitiareponame(data:any,) {
   this.storage.setItem(this.gitiareponame,JSON.stringify (data));
   //console.log(this.data);
}
getgitiareponame(): any {
  //console.log(this.data);
  var data = JSON.parse(this.storage.getItem(this.gitiareponame));
  //let data = this.storage.getItem(this.data);
    return data;
}
public removereponame() {
  this.storage.removeItem(this.gitiareponame);
}
private repoIdKey: any;
public storereposhaid(sha:any) {
  this.storage.setItem(this.repoIdKey,sha.toString());
}
public removereposhaid() {
  this.storage.removeItem(this.repoIdKey);
}
getreposhaid(): number {
  this.removereposhaid();
  let repoId = +this.storage.getItem(this.repoIdKey);
  return repoId;
}
}
