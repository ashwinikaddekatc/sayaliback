import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WireframeService } from 'src/app/services/builder/wireframe.service';
import { ExcelService } from 'src/app/services/excel.service';
import * as moment from 'moment';
import { WebpageBuilderService } from 'src/app/services/builder/webpage-builder.service';

@Component({
  selector: 'app-allwebpage',
  templateUrl: './allwebpage.component.html',
  styleUrls: ['./allwebpage.component.scss']
})
export class AllwebpageComponent implements OnInit {

  addModall:boolean = false;
  selected:any[] = [];
  loading = false;
  data:any;
  id:any;
  moduleId:any;
  modalDelete = false;
  rowSelected :any= {};
  rows: any[];
  error;
  constructor(
    private router : Router,
    private route: ActivatedRoute,
    private webpageservice : WebpageBuilderService,
    private wireframeservice : WireframeService,
    private excel: ExcelService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]; // fb_header_id
    this.moduleId = this.wireframeservice.getModuleId(); // get from session storage
    console.log("webpage ",this.moduleId);

    this.getWebpage(this.moduleId);
  }
  getWebpage(id:number)
  {
      console.log("getwebpage id: ",id);
      this.webpageservice.getAll(id).subscribe((data) =>{
        this.data = data;
        this.rows = this.data;
        console.log(data);
        if(this.data.length==0){
          this.error="No data Available";
          console.log(this.error)
        }
      },(error) => {
        console.log(error);
        if(error){
         this.error="No data Available";
       }
      });
  }

  openModal()
  {
    this.addModall = true;
  }
  gotoadd()
  {
      this.router.navigate(['../addpage'],{relativeTo:this.route});
  }
  goToEdit(id:number)
  {
     this.router.navigate(['../editpage/'+id],{relativeTo:this.route});
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
     this.webpageservice.deleteField(id).subscribe((data)=>{
      console.log(data);
      this.ngOnInit();
      if (data) {
        this.toastr.success('Deleted successfully');
            }
     },
     (error)=>{
      console.log("error while deleting data");
      if(error)
      {
        this.toastr.success('Record Not Deleted');
      }
     });

  }
  goToEdit1(id:number)
  {
      this.router.navigate(['../editdata/'+id],{relativeTo:this.route});
  }
}
