import { Component, OnInit } from '@angular/core';
import { StepperService } from 'src/app/services/fnd/stepper.service';
import { AlertService } from 'src/app/services/alert.service';
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from 'src/app/services/excel.service';
import * as moment from 'moment';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-allstepper',
  templateUrl: './allstepper.component.html',
  styleUrls: ['./allstepper.component.scss']
})
export class AllstepperComponent implements OnInit {
  rowSelected :any= {};
  modaldelete=false;
  loading = false;
  college;
  error;
  constructor(private mainService: StepperService,
    private alertService: AlertService,
    private toastr: ToastrService,
    private excel: ExcelService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.mainService.getAll().subscribe((data) => {
      console.log(data);
      this.college = data;
      this.college = data.studentEntity;
      if(this.college.length==0){
        this.error="No data Available";
        console.log(this.error)
      }
    },(error) => {
      console.log(error);
      if(error){
       this.error="Server Error";
     }
    });
  }
  onExport() {
    this.excel.exportAsExcelFile(this.college, 'user_',
      moment().format('YYYYMMDD_HHmmss'))
  }
  goToAdd() {
    this.router.navigate(["../add"], { relativeTo: this.route });

  }
  goToEdit(id: number) {
    this.router.navigate(["../edit/" + id], { relativeTo: this.route });
  }
  goToEditwf(wfid: number) {
    this.router.navigate(["../edit/" + wfid], { relativeTo: this.route });
  }
  onDelete(row) {
    this.rowSelected = row;
     this.modaldelete=true;
  }

  delete(id)
  {
    this.modaldelete = false;
    console.log("in delete  "+id);
    this.mainService.delete(id).subscribe(
      (data) => {
        console.log(data);
        this.ngOnInit();
      },
    );
    if (id) {
      this.toastr.success('Deleted successfully');
          }

  }
}
