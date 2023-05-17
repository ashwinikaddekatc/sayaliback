import { EventEmitter, Injectable, Input, Output } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment'
import { ProjectSetupService } from './project-setup.service';
@Injectable({
  providedIn: 'root'
})
export class SuregitService {
 public reponame;
  private storage: Storage = sessionStorage;
  baseurl = environment.cretedevlopmenturl;


private baseURL=`${this.baseurl}/repos/risadmin/test1/git/trees/55de5ca6644b24c63201eb71772801ef0d962a7e`;
private starurl=`${this.baseurl}/repos/risadmin/test1`;
private nameurl= `${this.baseurl}/repos/risadmin/test1/commits`;
private folderURL= `${this.baseurl}/repos/risadmin/test1/git/trees/`;
private fileURL = `${this.baseurl}/repos/risadmin/test1/git/blobs/`;
private branchlisturl=`${this.baseurl}/repos/risadmin/test1/branches`;
private burl=`${this.baseurl}/repos/risadmin/test1/contents`;
private downloadurl=`${this.baseurl}/repos/risadmin/archive/master.zip`;

//Deployment configs
// private baseURL ="http://13.126.217.36:31633/repos/admin123/project/git/trees/087923a862ffbbabb4615bc38ea054ecb761f68f";
// private starurl ="http://13.126.217.36:31633/repos/admin123/project";
// private nameurl="http://13.126.217.36:31633/repos/admin123/project/commits";
// private folderURL= "http://13.126.217.36:31633/repos/admin123/project/git/trees/";
// private fileURL = "http://13.126.217.36:31633/repos/admin123/project/git/blobs/";
// private branchlisturl="http://13.126.217.36:31633/repos/admin123/project/branches";
// private burl="http://13.126.217.36:31633/repos/admin123/project/contents";
//private downloadurl="http://13.126.217.36:31633/admin123/archive/master.zip";

giturl;
gitdata;
reposha;
reponame1;
  constructor(private http:HttpClient, private mainService: ProjectSetupService,) { this.getreponame();
    this.getname1().subscribe((data) => {
      console.log(data);
     this.reposha=data[0]["commit"]["tree"]["sha"];
   console.log(this.reposha)
    });}
getreponame(){
  this.gitdata = this.mainService.getdata();
  console.log(this.gitdata);
  this.giturl=this.gitdata.gitea_url;
  console.log(this.giturl);

  this.reponame=this.giturl.split("risadmin/");
  console.log(this.reponame);
  this.reponame=this.reponame[1].split(".git");
  console.log(this.reponame);
  console.log(this.reponame[0]);
this.reponame1=this.reponame[0];
// this.reponame=this.mainService.getgitiareponame();
// console.log(this.reponame);
// this.reposha=this.mainService.getreposhaid();
// console.log(this.reposha);
}

  getAll(): Observable<any> {
    //Create Request URL params

    return this.http.get(this.baseURL);
  }
  getstar():Observable<any>{
    return this.http.get(this.starurl);
  }
  getname():Observable<any>{
    return this.http.get(this.nameurl);
  }
  getById(id: number): Observable<any> {
    const _http = this.baseURL + "/" + id;
    return this.http.get(_http);
  }

  getAllfolder(id:string): Observable<any> {
    //Create Request URL params

    return this.http.get(this.folderURL+id);
  }
  getAllfile(id:string): Observable<any> {
    //Create Request URL params

    return this.http.get(this.fileURL+id);
  }
  getbranches():Observable<any>{
    return this.http.get(this.branchlisturl);
  }
  getb():Observable<any>{
    return this.http.get(this.burl);
  }
  getzip():Observable<any>{
    return this.http.get(this.downloadurl);
  }


  // reponame changes
  getAll1(): Observable<any> {
    //Create Request URL params

    return this.http.get(`${this.baseurl}/repos/risadmin/${this.reponame1}/git/trees/${this.reposha}`);
  }
  getstar1():Observable<any>{
    return this.http.get(`${this.baseurl}/repos/risadmin/${this.reponame1}`);
  }
  getname1():Observable<any>{
    return this.http.get(`${this.baseurl}/repos/risadmin/${this.reponame1}/commits`);
  }
  getById1(id: number): Observable<any> {
    const _http = `${this.baseurl}/repos/risadmin/${this.reponame1}/git/trees/${this.reposha}` + "/" + id;
    return this.http.get(_http);
  }

  getAllfolder1(id:string): Observable<any> {
    //Create Request URL params

    return this.http.get(`${this.baseurl}/repos/risadmin/${this.reponame1}/git/trees/`+id);
  }
  getAllfile1(id:string): Observable<any> {
    //Create Request URL params

    return this.http.get(`${this.baseurl}/repos/risadmin/${this.reponame1}/git/blobs/`+id);
  }
  getbranches1():Observable<any>{
    return this.http.get(`${this.baseurl}/repos/risadmin/${this.reponame1}/branches`);
  }
  getb1():Observable<any>{
    return this.http.get(`${this.baseurl}/repos/risadmin/${this.reponame1}/contents`);
  }

}
