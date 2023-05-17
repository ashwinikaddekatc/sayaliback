import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { ExcelService } from 'src/app/services/excel.service';
import { IncomingwebhookService } from 'src/app/services/fnd/incomingwebhook.service';
@Component({
  selector: 'app-incomwebhookall',
  templateUrl: './incomwebhookall.component.html',
  styleUrls: ['./incomwebhookall.component.scss']
})
export class IncomwebhookallComponent implements OnInit {
  loading = false;
  error;
  selected: any[] = [];
  rowSelected :any= {};
  modaldelete=false;
  data;
  constructor(private router: Router, private toastr: ToastrService,
    private route: ActivatedRoute,private excel: ExcelService,private webhookservice:IncomingwebhookService) { }

  ngOnInit(): void {
    this.getall();
  }
  getall(){
    this.webhookservice.incomegetall().subscribe((data)=>{
      console.log(data);
      this.data=data;
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
  goToEdit(id) {
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
    this.webhookservice.indelete(id).subscribe(
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
  goToAdd(){
    this.router.navigate(["../add"], { relativeTo: this.route });

  }
  onExport() {
    this.excel.exportAsExcelFile(this.data, 'user_',
      moment().format('YYYYMMDD_HHmmss'))
  }
}
