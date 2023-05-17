import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ProjectSetupService } from '../../../../../services/builder/project-setup.service';
import { ExcelService } from '../../../../../services/excel.service';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectSetup } from '../../../../../models/builder/Project_setup';
@Component({
  selector: 'app-allprojectsetup',
  templateUrl: './allprojectsetup.component.html',
  styleUrls: ['./allprojectsetup.component.scss']
})
export class AllprojectsetupComponent implements OnInit {
  loading = false;
  @ViewChild("getById") getById: TemplateRef<any>;
  @ViewChild("txId") txId: TemplateRef<any>;
  selected: any[] = [];
  rowSelected :any= {};
  modaldelete=false;
  modaladd=false;
  basic: boolean = false;
  columns: any[];
  rows: any[];
  temp = [];
  isLoading: boolean = false;
  project;
  projects: ProjectSetup[];


  tools1 = [
    {

      title: "Start from scratch, I have an idea",
      image: '/assets/images/fromscratch.png',
      action: "../add",
    },
    {
      title: "My DB is ready, let's import and start",
      action: "../create-table",
      image: '/assets/images/copytemplate.png',
    },

    {
      title: "Start with sampleapp, check templates",
      action: "../create-table",
      image: '/assets/images/database.png',
    },
   {
      title: "Copy from another public project",
      action: "../dashboard",
      image: '/assets/images/copyfromPrj.png',
    },
  ];
  projectsetup;
  error;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private excel: ExcelService,

    private projectSetupService: ProjectSetupService,) { }

  ngOnInit(): void {
    //this.getData();
    this.getData1();
  }
  getData() {
    this.projectSetupService.getAll().subscribe((data) => {
      console.log(data);
      this.project = data;
      this.project = data.items;

    });
  }
  getData1() {
    this.projectSetupService.getallmyproject().subscribe((data) => {
      console.log(data);
      this.projectsetup = data;
      if(data.length == 0){
        this.error="No data Available";
      }
      if(data.operationMessage =='Your Access is Denied Plz contact Admin'){
        this.toastr.error('Your Not Authorized To Access This Endpoint plz Contact Admin');

       }

     // this.projectsetup = data.items;
     // this.projectname=data.projectname;
    },(error) => {
      console.log(error);
      if(error){
       this.error="No data Available OR server Error";
     }
    });
  }
  onExport() {
    this.excel.exportAsExcelFile(this.projectsetup, 'user_',
      moment().format('YYYYMMDD_HHmmss'))
  }
  goToAdd() {
    this.modaladd=true;
    //this.router.navigate(["../add"], { relativeTo: this.route });
  }
  goToEdit(id: number) {
    this.router.navigate(["../edit/" + id], { relativeTo: this.route });
  }
  onDelete(row) {
    this.rowSelected = row;
     this.modaldelete=true;
  }

  delete(id)
  {
    this.modaldelete = false;
    console.log("in delete  "+id);
    this.projectSetupService.delete(id).subscribe(
      (data) => {
        console.log(data);
        this.ngOnInit();
        if (data) {
          this.toastr.success('Deleted successfully');
              }
      },
      (error) => {
        console.log('Error in adding data...',+error);
        if(error){
          this.toastr.error('Not Deleted Data Getting Some Error');
        }
      }
    );


  }

  goToModule(id: number,name:any) {
    this.router.navigate(["../../modules"], { relativeTo: this.route, queryParams: { p_id: id } });
  }
  goTocard(){
    this.router.navigate(["../../projectcard"], { relativeTo: this.route });
  }
}
