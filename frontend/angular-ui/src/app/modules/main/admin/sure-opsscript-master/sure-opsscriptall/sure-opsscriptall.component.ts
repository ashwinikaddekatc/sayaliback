import { Component, OnInit } from '@angular/core';
import { ExcelService } from 'src/app/services/excel.service';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import {SureOpsscriptmasterService} from '../../../../../services/admin/sure-opsscriptmaster.service'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-sure-opsscriptall',
  templateUrl: './sure-opsscriptall.component.html',
  styleUrls: ['./sure-opsscriptall.component.scss']
})
export class SureOpsscriptallComponent implements OnInit {
  loading = false;
  selected: any[] = [];
  scriptdata;
  rowSelected :any= {};
  modaldelete=false;
  mcreate;
mdelete;
medit;
showdata;
error;
  constructor(private excel: ExcelService,private router: Router, private toastr:ToastrService,
    private route:ActivatedRoute, private SureOpsscriptmasterService: SureOpsscriptmasterService) { }

  ngOnInit(): void {
    this.getall();
  }
  getall(){
    this.SureOpsscriptmasterService.getAll().subscribe((data)=>{
      console.log(data);
      this.scriptdata=data;
      if(data.length == 0){
        this.error="No data Available plz add if Required";
        console.log(this.error)
      }
          },(error) => {
            console.log(error);
            if(error){
             this.error="Server Error";
           }
          });
  }
  goToEdit(id: number)
  {
      this.router.navigate(['../edit/'+id],{relativeTo:this.route});
  }

  onExport()
  {
    this.excel.exportAsExcelFile(this.scriptdata, 'user_',
    moment().format('YYYYMMDD_HHmmss'))
  }
  onDelete(row)
  {
    this.rowSelected = row;
    this.modaldelete=true;
  }
  delete(id)
  {
    this.modaldelete = false;
    console.log("in delete  "+id);
    this.SureOpsscriptmasterService.delete(id).subscribe((data)=>{
      console.log(data);
        this.ngOnInit();
        if (data) {
          this.toastr.success('Deleted successfully');
              }
    },
    (error)=>{
      console.log('Error in adding data...',+error);
        if(error){
          this.toastr.error('Not deleted Data Getting Some Error');
        }
    }
    );
  }
  goToAdd()
  {
     this.router.navigate(['../add'],{relativeTo:this.route});
  }
  goToscriptmaster(id: number)
  {
    this.router.navigate(['../editscript/'+id],{relativeTo:this.route});
  }
}
