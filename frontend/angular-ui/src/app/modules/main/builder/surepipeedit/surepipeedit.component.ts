import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectSetupService } from 'src/app/services/builder/project-setup.service';
import { SureopsService } from 'src/app/services/builder/sureops.service';
import {SurepipeService} from '../../../../services/builder/surepipe.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-surepipeedit',
  templateUrl: './surepipeedit.component.html',
  styleUrls: ['./surepipeedit.component.scss']
})
export class SurepipeeditComponent implements OnInit {
id;
getbyiddata;
stepdata;
arrayTag;
pid;
project;
projectname;
dataRefreshInterval:any;
//arrayTag=[{"step":"step0","state":"success","open":false,"failed":false},{"step":"step1","state":"success","open":false,"failed":false},]
  constructor(private surepipe:SurepipeService,private projectSetupService: ProjectSetupService,
    private router: Router,private suropsService:SureopsService, private toastr:ToastrService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    console.log("update with id = ", this.id);
    this.getbyid(this.id);

  }
  ngOnDestroy() {
    // Clean up the interval subscription
    clearInterval(this.dataRefreshInterval);
    console.log("clear Interval")
  }

getbyid(id:number){
  this.dataRefreshInterval = setInterval(() => {
this.suropsService.getbypipeid(id).subscribe((data)=>{
  this.getbyiddata=data;
  // console.log(this.getbyiddata);
  //this.stepdata=this.getbyiddata.current_json
  // console.log(this.stepdata);
  this.arrayTag = JSON.parse(this.getbyiddata.current_json);
  // console.log(this.arrayTag);
  if(this.arrayTag.length === 0){
    this.toastr.error("Data not found");
    clearInterval(this.dataRefreshInterval);
  }
  const step = this.arrayTag.length;
  if(this.arrayTag[step -1].state === 'success'){
    clearInterval(this.dataRefreshInterval);
    console.log("Clear Interval")
  }
  this.pid=this.getbyiddata.ref;
  // console.log(this.pid);
  this.pdata(this.pid)

},(err) => {
  console.log(err);
  if(err)
  {
    this.toastr.error("getting some error");
    clearInterval(this.dataRefreshInterval);
    console.log("Clear Interval"+err)
  }
})
}, 1000);
}
pdata(id: number) {
  this.projectSetupService.getById(id).subscribe(
    (data) => {
      this.project = data;
      // console.log(this.project)
this.projectname=this.project.projectName;
// console.log(this.projectname)
    },
    (err) => {
      console.log(err);
    }
  );
}
}
