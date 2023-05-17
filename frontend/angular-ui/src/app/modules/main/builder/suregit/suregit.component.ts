import { Component, Input, OnInit } from '@angular/core';
import {SuregitService} from '../../../../services/builder/suregit.service';
import {Suregit} from '../../../../models/builder/suregit';
import { Surestar } from '../../../../models/builder/surestar';
import { Surename } from '../../../../models/builder/surename';
import { ActivatedRoute, Router } from '@angular/router';
import { anyOrAllPropertiesPass } from '@cds/core/internal';
import { HttpClient,HttpErrorResponse  } from '@angular/common/http';
import * as JSZip from 'jszip';
import * as FileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { HostListener } from '@angular/core';
import { ProjectSetupService } from 'src/app/services/builder/project-setup.service';
@Component({
  selector: 'app-suregit',
  templateUrl: './suregit.component.html',
  styleUrls: ['./suregit.component.scss']
})
export class SuregitComponent implements OnInit {

  showme:boolean=false;
  suregit:Suregit[];
  surestar:Surestar;
  sure:Surename;
  name:any="";
  gitid:any="";
  temprouterlink="";
    msg: any;
    date;
    branchdata;
    branch;
    gitdata;
    giturl;
    reponame;
    interval: any;
    reposhaid;
  constructor(private suregitservice:SuregitService,
    private mainService: ProjectSetupService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private httpClient: HttpClient,  ) { }

  ngOnInit(): void {
this.suregitservice.getreponame();
    this.gitdata = this.mainService.getdata();
console.log(this.gitdata);
this.giturl=this.gitdata.gitea_url;
if(this.giturl==null){
  this.toastr.error("Gitia Url is Null")
}
console.log(this.giturl);

this.reponame=this.giturl.split("admin123/");
console.log(this.reponame);
this.reponame=this.reponame[1].split(".git");
console.log(this.reponame);
console.log(this.reponame[0]);
//this.mainService.removereponame();
this.mainService.storeaddedgitiareponame(this.reponame[0]);
// this.interval = setInterval(() => {
//     this.getall();
//    }, 7000);
   setTimeout(() => {
    this.getall();
}, 7000);
//star,fork
this.surestar = new Surestar();
this.suregitservice.getstar1().subscribe((data) => {
  this.surestar= data;
  console.log(this.surestar);

} ,(error: HttpErrorResponse)=>{
  console.log(error);
  if(error.status===404){
    this.toastr.error("Server Error");
  }
  if(error.status===409){
    this.toastr.error("Repository is empty");
  }
});

//sha
//name

this.getreadme();
this.sure= new Surename();
this.suregitservice.getname1().subscribe((data) => {
  this.sure= data;
  console.log(data);
 this.name = data[0]["commit"]["committer"];

this.reposhaid= this.mainService.getreposhaid();
console.log(this.reposhaid);
if(this.reposhaid!==null){
  this.mainService.removereposhaid();

}
 this.gitid=data[0]["commit"]["tree"]["sha"];
this.mainService.storereposhaid(this.gitid);
this.msg=data[0]["commit"]["message"];
this.date=data[0]["created"]
console.log(this.date);
},(error) => {
  console.log(error);
  if(error){
   this.toastr.error("Server Error");
 }
});


// get branches
this.suregitservice.getbranches1().subscribe((data)=>{
  this.branchdata=data;
  console.log(data);
  this.branch= data[0]["name"];
})
  }

  toggle(){
    this.showme=!this.showme;
  }
  readmeid;
getall(){
  this.suregitservice.getAll1().subscribe((data) => {
    this.suregit = data.tree;
    console.log(data.tree);
    for(let i=0;i<=100;i++){
     if(data.tree[i]?.path=='README.md'){
this.readmeid=data.tree[i].sha;
console.log(this.readmeid);
     }

    }
    this.getreadme();
  });
}

  getbyid(id){
    this.router.navigate(["../gitfolder"], { relativeTo: this.route });

  }
  onclick(user:Suregit){
    // console.log(user);
    // this.temprouterlink = "/main/gitfolder/"+user.sha;
    // console.log(this.temprouterlink);
    this.router.navigate(["../gitfolder"], { relativeTo: this.route ,queryParams:{id:user.sha, name:user.path}});
  }
  onclick1(user:Suregit){
    // console.log(user);
    // this.temprouterlink = "/main/gitfolder/"+user.sha;
    // console.log(this.temprouterlink);
    this.router.navigate(["../gitfile"], { relativeTo: this.route ,queryParams:{id:user.sha,name:user.path}});
  }
  copied;
  copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);

if(inputElement.setSelectionRange){
  this.toastr.success("Link Copy Succesfully");
  this.copied=("Copy Succesfully")
}
  }
  title;
  uploadFiles;
  download() {
    var zip = new JSZip();
    zip.file("Title.txt", this.title);
    var imgFolder = zip.folder("images");
    for (let i = 0; i < this.suregit?.length; i++) {
      //imgFolder.file(this.uploadFiles[i].name, this.uploadFiles[i], { base64: true });
    }
    zip.generateAsync({ type: "blob" })
      .then(function (content) {
        FileSaver.saveAs(content, "Sample.zip");
      });
  }
downloadfile(){
  this.suregitservice.getzip().subscribe((data)=>{
    console.log(data);

  })
}
decode(enc:string){
  if(enc!=null){
  return atob(enc);}
}
readmedata;
readid='e169a81d8a3ca6902ef44183222bdd3038b90ab5'
getreadme(){
  this.suregitservice.getAllfile1(this.readmeid).subscribe((data) => {
    this.readmedata = data;
    console.log(this.readmedata);

});
}

}
