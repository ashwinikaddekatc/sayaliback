import { Component, OnInit } from '@angular/core';
import {SuregitService} from 'src/app/services/builder/suregit.service';
import {Suregit} from 'src/app/models/builder/suregit';
import { Surestar } from 'src/app/models/builder/surestar';
import { Surename } from 'src/app/models/builder/surename';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-gitfolder',
  templateUrl: './gitfolder.component.html',
  styleUrls: ['./gitfolder.component.scss']
})
export class GitfolderComponent implements OnInit {
  showme:boolean=false;
  suregit:Suregit[];
  surestar:Surestar;
  sure:Surename;
  name:any="";
  gitid:any="";
    msg: any;
  id: any;
  tempid:any;
  date;
  foldername;
  constructor(private suregitservice:SuregitService,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    let id= this.route.snapshot.queryParams.id
    this.foldername= this.route.snapshot.queryParams.name
    console.log(this.foldername);
        this.suregitservice.getAllfolder1(id).subscribe((data) => {
      this.suregit = data.tree;
      console.log(data.tree);

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
this.date=data[0]["created"]
console.log(this.date);
});
  }

  toggle(){
    this.showme=!this.showme;
  }
  onclick(user:Suregit){
    // console.log(user);
    // this.temprouterlink = "/main/gitfolder/"+user.sha;
    // console.log(this.temprouterlink);
    this.router.navigate(["../gitfolder1"], { relativeTo: this.route ,queryParams:{id:user.sha, name:user.path,folder:this.foldername}});
  }
  onclick1(user:Suregit){
    // console.log(user);
    // this.temprouterlink = "/main/gitfolder/"+user.sha;
    // console.log(this.temprouterlink);
    this.router.navigate(["../gitfile1"], { relativeTo: this.route ,queryParams:{id:user.sha, name:user.path}});
  }
}
