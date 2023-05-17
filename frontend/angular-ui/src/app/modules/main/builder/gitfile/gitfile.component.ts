import { Component, OnInit } from '@angular/core';
import {Suregit} from 'src/app/models/builder/suregit';
import { Surestar } from 'src/app/models/builder/surestar';
import { Surename } from 'src/app/models/builder/surename';
import { SuregitService } from 'src/app/services/builder/suregit.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Gitfile } from 'src/app/models/builder/gitfile';
@Component({
  selector: 'app-gitfile',
  templateUrl: './gitfile.component.html',
  styleUrls: ['./gitfile.component.scss']
})
export class GitfileComponent implements OnInit {
  showme:boolean=false;
  suregit:Gitfile;
  surestar:Surestar;
  sure:Surename;
  name:any="";
  gitid:any="";
    msg: any;
    filename;
  constructor(
    private suregitservice:SuregitService,
    private http:HttpClient,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id= this.route.snapshot.queryParams.id
    this.filename= this.route.snapshot.queryParams.name
    console.log(this.filename);
    this.suregit = new Gitfile();
    this.suregitservice.getAllfile1(id).subscribe((data) => {
      this.suregit = data;
      console.log(this.suregit);

    });
//star,fork
this.surestar = new Surestar();
this.suregitservice.getstar1().subscribe((data) => {
  this.surestar= data;
  console.log(this.surestar);

});
//name

this.sure= new Surename();
this.suregitservice.getname1().subscribe((data) => {
  this.sure= data;
  console.log(data);
 this.name = data[0]["commit"]["committer"];
 this.gitid=data[0]["commit"]["tree"]["sha"];
this.msg=data[0]["commit"]["message"];
});
  }
  toggle(){
    this.showme=!this.showme;
  }
  decode(enc:string){
    if(enc!=null){
    return atob(enc);}
  }
}
