import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WireframeService } from 'src/app/services/builder/wireframe.service';
import { ExcelService } from 'src/app/services/excel.service';
import { Dashboard3Service } from '../../../../../services/builder/dashboard3.service';
import * as moment from 'moment';
@Component({
  selector: 'app-allnewdash',
  templateUrl: './allnewdash.component.html',
  styleUrls: ['./allnewdash.component.scss']
})
export class AllnewdashComponent implements OnInit {
  addModall:boolean = false;
  selected:any[] = [];
  loading = false;
  data:any;
  id:any;
  moduleId:any;
  modalDelete = false;
  rowSelected :any= {};
  rows: any[];
  constructor(
    private router : Router,
    private route: ActivatedRoute,private dashboardService : Dashboard3Service,
    private wireframeservice : WireframeService,
    private excel: ExcelService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]; // fb_header_id
    this.moduleId = this.wireframeservice.getModuleId(); // get from session storage
    console.log(this.moduleId);

    this.getdashboard(this.moduleId);
  }
  getdashboard(id:number)
  {
    console.log("getdashboard id: ",id);
    this.dashboardService.getAll(id).subscribe((data) =>{
      this.data = data;
      this.rows = this.data;
      console.log(data);
    });
  }

  openModal()
  {
    this.addModall = true;
  }
  gotoadd()
  {
      this.router.navigate(['../adddata'],{relativeTo:this.route});
  }
  goToEdit(id:number)
  {
     this.router.navigate(['../editdashn/'+id],{relativeTo:this.route});
  }

  onExport() {
    this.excel.exportAsExcelFile(this.rows, 'user_',
      moment().format('YYYYMMDD_HHmmss'))
  }

  onDelete(row){
    this.rowSelected = row;
    console.log(this.rowSelected);
    this.modalDelete = true;
  }
  delete(id)
  {
     this.modalDelete = false;
     console.log("in delete  "+id);
     this.dashboardService.deleteField(id).subscribe((data)=>{
      console.log(data);
      this.ngOnInit();
     });
     if (id) {
      this.toastr.success('Deleted successfully');
          }
  }
  // openModal()
  // {
  //   this.addModall = true;
  // }
  // gotoadd()
  // {
  //     this.router.navigate(['../adddata'],{relativeTo:this.route});
  // }
  // goToEdit()
  // {
  //    this.router.navigate(['../editdashn'],{relativeTo:this.route});
  // }

}
