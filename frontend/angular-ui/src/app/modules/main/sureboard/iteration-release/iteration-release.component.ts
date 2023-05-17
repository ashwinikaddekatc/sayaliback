import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MenuGroupService } from 'src/app/services/admin/menu-group.service';
import { ExcelService } from 'src/app/services/excel.service';
import { IterationServiceService } from 'src/app/services/sureboard/iteration-service.service';
@Component({
  selector: 'app-iteration-release',
  templateUrl: './iteration-release.component.html',
  styleUrls: ['./iteration-release.component.scss']
})
export class IterationReleaseComponent implements OnInit {

  loading = false;
  selected:any[] = [];
  alldata:any;
  rowSelected :any= {};
  modaldelete=false;
  mcreate;
  medit;
  mdelete;
  showdata;
  error;
  constructor(private route:ActivatedRoute,
    private router:Router,
    private excel:ExcelService,
    private toastr:ToastrService,
    private menuGroupService: MenuGroupService,
    private iterationservice: IterationServiceService,) { }

  ngOnInit(): void {
    this.showdata = this.menuGroupService.getdata();
    console.log(this.showdata);
      this.mcreate=this.showdata.mcreate;
      console.log(this.mcreate);
      this.mdelete=this.showdata.mdelete
      console.log(this.mdelete);
      this.medit=this.showdata.medit
      console.log(this.medit);
    this.getall();
  }

  goToAdd()
  {
    this.router.navigate(["../add-iteration"],{ relativeTo: this.route});
  }
  getall(){
    this.iterationservice.getall().subscribe((data)=>{
      this.alldata=data
   console.log(this.alldata);
   if(this.alldata.length==0){
    this.error="No data Available";
    console.log(this.error)
  }
    },(error) => {
      console.log(error);
      if(error){
       this.error="Server Error";
     }
    })
  }
gotoEdit(id:number){
  this.router.navigate(["../edit-iteration/" +id],{ relativeTo: this.route});
}
onDelete(row) {
  this.rowSelected = row;
   this.modaldelete=true;
}
delete(id){
  this.modaldelete = false;
  console.log("in delete  "+id);
  this.iterationservice.delete(id).subscribe(
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
          this.toastr.error('Not deleted Data Getting Some Error');
        }
    });
}
}
