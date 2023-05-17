import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MenuGroupService } from 'src/app/services/admin/menu-group.service';
import {SureconnectService} from '../../../../services/admin/sureconnect.service'
@Component({
  selector: 'app-sureconnect',
  templateUrl: './sureconnect.component.html',
  styleUrls: ['./sureconnect.component.scss']
})
export class SureconnectComponent implements OnInit {
  loading = false;

  selected: any[] = [];
  rowSelected :any= {};
  modaldelete=false;
  modaladd=false;
  data;
  alldata;
  mcreate;
  medit;
  mdelete;
  showdata;
  error;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private toastr:ToastrService,
    private menuGroupService: MenuGroupService,
    private sureservice:SureconnectService) { }

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
    this.sureservice.getAll().subscribe((data)=>{
      this.alldata=data;
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
  goToAdd(){
     this.router.navigate(["../oauth"], { relativeTo: this.route });
  }
  goToEdit(id){
    this.router.navigate(["../editconnect/" +id], { relativeTo: this.route });
  }
  onDelete(row) {
    this.rowSelected = row;
     this.modaldelete=true;
  }
  delete(id){
    this.modaldelete = false;
    console.log("in delete  "+id);
    this.sureservice.delete(id).subscribe(
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
