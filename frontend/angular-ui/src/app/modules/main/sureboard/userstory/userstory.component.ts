import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MenuGroupService } from 'src/app/services/admin/menu-group.service';
import { ExcelService } from 'src/app/services/excel.service';
import { UserstoryService } from 'src/app/services/sureboard/userstory.service';

@Component({
  selector: 'app-userstory',
  templateUrl: './userstory.component.html',
  styleUrls: ['./userstory.component.scss']
})
export class UserstoryComponent implements OnInit {
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
    private userstoryservice:UserstoryService) { }

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
  getall(){
    this.userstoryservice.getall().subscribe((data)=>{
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
  goToAdd()
  {
    this.router.navigate(["../add-userstory"],{ relativeTo: this.route});
  }
  gotoEdit(id:number){
    this.router.navigate(["../edit-userstory/" +id],{ relativeTo: this.route});
  }
  onDelete(row) {
    this.rowSelected = row;
     this.modaldelete=true;
  }
  delete(id){
    this.modaldelete = false;
    console.log("in delete  "+id);
    this.userstoryservice.delete(id).subscribe(
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
