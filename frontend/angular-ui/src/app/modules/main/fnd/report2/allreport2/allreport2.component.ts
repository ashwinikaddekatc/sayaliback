import { Component, OnInit } from '@angular/core';
import { ReportBuilderService } from 'src/app/services/api/report-builder.service';
import { ReportBuilder } from 'src/app/models/builder/ReportBuilder';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-allreport2',
  templateUrl: './allreport2.component.html',
  styleUrls: ['./allreport2.component.scss']
})
export class Allreport2Component implements OnInit {
  moduleId: number;
  columns: any[];
  rows: any[];
  temp = [];
  isLoading: boolean = false;
  reports: ReportBuilder[];
  loading = false;
  selected: any[] = [];
  rowSelected :any= {};
  modaldelete=false;
  error;
  constructor(private reportBuilderService: ReportBuilderService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.moduleId = this.reportBuilderService.getModuleId(); // get from session storage
    console.log(this.moduleId);

    this.getModuleReport(this.moduleId);

    this.columns = [
    //  { prop: "id", name: "Actions"},
      { prop: "report_name", name: "Report Name" },
      { prop: "description", name: "Description" },
      { prop: "report_tags", name: "Report Tags" },
      { prop: "servicename", name: "Service name" },

    ];
  }
  getModuleReport(id: number) {
    this.isLoading = true;
    //this.moduleService.getById(id).subscribe((data) => {
      this.reportBuilderService.getAll(id).subscribe((data) => {
      this.isLoading = false;
      console.log(data);
      //this.wireFrames = data.rn_fb_headers;
      this.reports = data.items;
      console.log('reports: ', this.reports);
      this.rows = this.reports;
      if(data.length == 0){
        this.error="No data Available";
        console.log(this.error);
      }
      //this.temp = [...this.reports];
    });
  }

  goToAdd() {
    //this.router.navigate(["../add"], { relativeTo: this.route });
    this.router.navigate(["../add"], { relativeTo: this.route });
  }

  goToTable(id: number) {
    //this.router.navigate(["../edit/" + id], { relativeTo: this.route });
    this.router.navigate(["../table-setup"], { relativeTo: this.route,queryParams: { report_id: id} });

  }
  goToEdit(id: number) {
    console.log("report id",id);

    this.router.navigate(["../edit/" + id], { relativeTo: this.route });
  }

  name:string;
  goToRunner(id: number) {
    this.reportBuilderService.getById(id).subscribe(
      (data) => {
        console.log("service report data ",data);

        this.name=data.report_name;
        this.router.navigate(["../"+this.name+""], { relativeTo: this.route,queryParams: { report_id: id} });

      },
      (err) => {
        console.log(err);
      }
    );
  }
  onDelete(row) {
    this.rowSelected = row;
     this.modaldelete=true;
  }

  delete(id)
  {
    this.modaldelete = false;
    console.log("in delete  "+id);


  }
}
