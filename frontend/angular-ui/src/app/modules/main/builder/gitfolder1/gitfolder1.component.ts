import { Component, OnInit } from '@angular/core';
import {SuregitService} from 'src/app/services/builder/suregit.service';
import {Suregit} from 'src/app/models/builder/suregit';
import { Surestar } from 'src/app/models/builder/surestar';
import { Surename } from 'src/app/models/builder/surename';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-gitfolder1',
  templateUrl: './gitfolder1.component.html',
  styleUrls: ['./gitfolder1.component.scss']
})
export class Gitfolder1Component implements OnInit {
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
  oldfolder;
  springfol;
  secondfol;
  mainfol;
  main2fol;
  main3fol;
  main4fol;
  constructor(private suregitservice:SuregitService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    let id= this.route.snapshot.queryParams.id
    this.foldername= this.route.snapshot.queryParams.name
    this.main4fol=this.route.snapshot.queryParams.main4fol
    console.log(this.main4fol);
    this.main3fol=this.route.snapshot.queryParams.main3fol
    console.log(this.main3fol);
    this.main2fol=this.route.snapshot.queryParams.main2fol
    console.log(this.main2fol);
    this.mainfol=this.route.snapshot.queryParams.mainfol
    console.log(this.mainfol);
    this.springfol=this.route.snapshot.queryParams.olddfol
    console.log(this.springfol);
    this.secondfol=this.route.snapshot.queryParams.oldfol
    console.log(this.secondfol);
    this.oldfolder=this.route.snapshot.queryParams.folder
    console.log(this.oldfolder);
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
    this.router.navigate(["../gitfolder2"], { relativeTo: this.route ,queryParams:{id:user.sha, name:user.path,olddfol:this.secondfol,oldfol: this.oldfolder,folder:this.foldername,mainfol:this.springfol,main2fol:this.mainfol,main3fol:this.main2fol,main4fol:this.main3fol}});
  }
  onclick1(user:Suregit){
    // console.log(user);
    // this.temprouterlink = "/main/gitfolder/"+user.sha;
    // console.log(this.temprouterlink);
    this.router.navigate(["../gitfile1"], { relativeTo: this.route ,queryParams:{id:user.sha, name:user.path}});
  }
}
