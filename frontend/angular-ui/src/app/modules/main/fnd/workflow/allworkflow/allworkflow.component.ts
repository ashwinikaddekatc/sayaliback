import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExcelService } from 'src/app/services/excel.service';
import { WorkflowDataService} from 'src/app/services/fnd/workflow-data.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { MenuGroupService } from 'src/app/services/admin/menu-group.service';
@Component({
  selector: 'app-allworkflow',
  templateUrl: './allworkflow.component.html',
  styleUrls: ['./allworkflow.component.scss']
})
export class AllworkflowComponent implements OnInit {
  loading = false;
  selected: any[] = [];
  workflow_data;
  rowSelected :any= {};
  modaldelete=false;
  mcreate;
mdelete;
medit;
showdata;
error;
  constructor( private router: Router,
    private route:ActivatedRoute,
    private workflowserive:WorkflowDataService,
    private excel: ExcelService,
    private menuGroupService: MenuGroupService,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.showdata = this.menuGroupService.getdata();
  console.log(this.showdata);
    this.mcreate=this.showdata.mcreate;
    console.log(this.mcreate);
    this.mdelete=this.showdata.mdelete
    console.log(this.mdelete);
    this.medit=this.showdata.medit
    console.log(this.medit);
    // this.mcreate=this.route.snapshot.queryParams.mc
    // console.log(this.mcreate);
    // this.medit=this.route.snapshot.queryParams.me
    // console.log(this.medit);
    // this.mdelete=this.route.snapshot.queryParams.md
    // console.log(this.mdelete);
    this.workflowserive.getAll().subscribe((data)=>{
      console.log(data);
      this.workflow_data = data;
      if(data.length==0){
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
  goToAdd()
  {
      this.router.navigate(['../add'],{relativeTo:this.route});
  }
  goToWorkflow(id: number)
  {
    this.router.navigate(['../editworkflow/'+id],{relativeTo:this.route});
  }

  goToEdit(id: number)
  {
      this.router.navigate(['../edit/'+id],{relativeTo:this.route});
  }
  onExport()
  {
    this.excel.exportAsExcelFile(this.workflow_data, 'user_',
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
    this.workflowserive.delete(id).subscribe((data)=>{
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
}
