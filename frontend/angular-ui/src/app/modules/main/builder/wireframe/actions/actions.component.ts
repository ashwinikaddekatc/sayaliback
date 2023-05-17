import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { WireframeService } from "../../../../../services/builder/wireframe.service";
import {Dashboard3Service} from '../../../../../services/builder/dashboard3.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { ModulesetupService } from 'src/app/services/builder/modulesetup.service';
import { LinebuilderService } from 'src/app/services/builder/linebuilder.service';
export interface Tools {
  title: string;
  details: string;
  action: string;
}
@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  columns: any[];
  moduleId: number;
  dcount:any;
  wcount:any;
  acount:any;
  rcount:any;
  pname:any;
  lcount:any;
  modulename:any;
  constructor( private router: Router,
    private route: ActivatedRoute,
    private wireframeService: WireframeService,
    private dashboardservice:Dashboard3Service, private moduleSetupService: ModulesetupService,
    private lineBuilder:LinebuilderService) { }

  ngOnInit(): void {
    this.pname= this.route.snapshot.queryParams.pname
    this.route.queryParams.subscribe((params) => {
      this.moduleId = +params["m_id"];
      //this.pname= +params["pname"];
      console.log(this.pname);
    });
    this.wireframeService.storeModuleId(this.moduleId);
    this.dashboardcount(this.moduleId);
    this.wirefamecount(this.moduleId);
    this.modulegetbyid(this.moduleId);
    this.reportcount(this.moduleId);
    this.actioncount(this.moduleId);
    this.linecount(this.moduleId);
  }
  modulegetbyid(id:any){
    this.moduleSetupService.getById(id).subscribe((data)=>{
      console.log(data);
      this.modulename=data.moduleName;
    })
  }
  dashboardcount(id){
    this.dashboardservice.getcount(id).subscribe((data)=>{
      console.log(data);
this.dcount=data;
console.log(this.dcount);
    });
  }
  wirefamecount(id:any){
    this.wireframeService.wireframecount1(id).subscribe((data)=>{
      console.log(data);
      this.wcount=data;
      //console.log(this.wcount);
    })
  }
  reportcount(id:any){
    this.wireframeService.reportcount(id).subscribe((data)=>{
      console.log(data);
      this.rcount=data;
      //console.log(this.wcount);
    })
  }
  actioncount(id:any){
    this.wireframeService.actioncount(id).subscribe((data)=>{
      console.log(data);
      this.acount=data;
      //console.log(this.wcount);
    })
  }

  linecount(id:any){
    this.lineBuilder.getLinecount(id).subscribe((data)=>{
      console.log(data);
      this.lcount=data;
      //console.log(this.wcount);
    })
  }
  tools: Tools[] = [

    {
      title: "Create Table",
      details: "Create Table for Your Project",
      action: "../create-table",
    },
    {
      title: "Form Builder",
      details: "Create Form for Your Project",
      action: "../from-build",
    },
    {
      title: "Report Builder",
      details: "Generate Report for Your Project",
      action: "../reporttype",
    },
    {
      title: "Api Builder",
      details: "Create API for Your Project",
      action: "../api-build",
    },

    {
      title: "BI Builder",
      details: "Create BI for Your Project",
      action: "../bi-build",
    },
    {
      title: "Query Builder",
      details: "Create Query for Your Project",
      action: "../query-build",
    },
    {
      title: "App Builder",
      details: "Create App for Your Project",
      action: "../app-build",
    },
    {
      title: "Wireframe Builder",
      details: "Create Wireframe for Your Project",
      action: "../wireframe",
    },
  ];

  tools1= [
    {

      title: "Wireframes",
      details: "Create Wireframe for Your Project",
      action: "../wireframe",
      icon:"../../../../../assets/images/action/Form.png",

    },
    {
      title: "Workflow",
      details: "Create Table for Your Project",
      action: "../create-table",
      icon:"../../../../../assets/images/action/Process.png"
    },

    {
      title: "Reports",
      details: "Generate Report for Your Project",
      action: "../reporttype",
      icon:"../../../../../assets/images/action/Reports.png"
    },
    {
      title: "Web Page",
      details: "Create API for Your Project",
      action: "../api-build",
      icon:"../../../../../assets/images/action/web.png"
    },

    {
      title: "Actions",
      details: "Create BI for Your Project",
     action: "../action-builder",
      icon:"../../../../../assets/images/action/Actions.png"
    },
    {
      title: "Permissions",
      details: "Create Query for Your Project",
      action: "../query-build",
      icon:"../../../../../assets/images/action/Permissions.png"
    },
    {
      title: "Jobs",
      details: "Create App for Your Project",
      action: "../app-build",
      icon:"../../../../../assets/images/action/Jobs.png"
    },
    {
      title: "Dashboards",
      details: "Create Wireframe for Your Project",
      action: "../bi-build",
      icon:"../../../../../assets/images/action/Dashboards.png"
    },

    {
      title: "DashboardsNew",
      details: "Create Wireframe for Your Project",
      //count:this.dcount,
     // action: `../dashboard3/${392}`,
     action: "../dashboard-gird",
      icon:"../../../../../assets/images/action/Dashboards.png",

    },
    {
      title: "ListBuilder",
      details: "Create List Builder",
      action: "../list-builder",
      icon:"../../../../../assets/images/action/list.png",

    },
  ];


}
