import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from 'src/app/services/excel.service';
import * as moment from 'moment';
import { DatastoreService } from 'src/app/services/fnd/datastore.service';
@Component({
  selector: 'app-datasourceall',
  templateUrl: './datasourceall.component.html',
  styleUrls: ['./datasourceall.component.scss']
})
export class DatasourceallComponent implements OnInit {
  loading = false;
  error;
  selected: any[] = [];
  rowSelected :any= {};
  modaldelete=false;
  data;
  constructor(private router: Router, private toastr: ToastrService,
    private route: ActivatedRoute,private excel: ExcelService,private dataservice:DatastoreService) { }

  ngOnInit(): void {
    this.getall();
  }
  getall(){
    this.dataservice.getAll2().subscribe((data)=>{
      console.log(data);
      this.data=data;
      if(this.data.length == 0){
        this.error="No data Available";
        console.log(this.error);
      }

    },(error) => {
      console.log(error);
      if(error){
       this.error="No data Available OR server Error";
     }
    });

  }
  goToAdd(){
    this.router.navigate(["../add"], { relativeTo: this.route });

  }
  onExport() {
    this.excel.exportAsExcelFile(this.data, 'user_',
      moment().format('YYYYMMDD_HHmmss'))
  }
  goToEdit(id) {
    this.router.navigate(["../edit/" + id], { relativeTo: this.route });
  }

  onDelete(row) {
    this.rowSelected = row;
     this.modaldelete=true;
  }

  delete(id){
    this.modaldelete = false;
    console.log("in delete  "+id);
    this.dataservice.delete2(id).subscribe(
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
}
