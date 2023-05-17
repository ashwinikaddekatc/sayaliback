import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MenuGroupService } from 'src/app/services/admin/menu-group.service';
import {JobmanagementService} from '../../../../services/fnd/jobmanagement.service'
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-jobmanagement',
  templateUrl: './jobmanagement.component.html',
  styleUrls: ['./jobmanagement.component.scss']
})
export class JobmanagementComponent implements OnInit {
mcreate;
medit;
mdelete;
rowSelected :any= {};
  modaldelete=false;
  modalEdit=false;
  modalAdd= false;
  public entryForm: FormGroup;
  error;
  loading = false;
  data;
  selected: any[] = [];
  showdata;
  constructor( private route: ActivatedRoute,
    private _fb: FormBuilder,
    private toastr: ToastrService,
    private menuGroupService: MenuGroupService,
    private jbmaservice:JobmanagementService,
    private router: Router) { }

  ngOnInit(): void {
    this.showdata = this.menuGroupService.getdata();
    console.log(this.showdata);
      this.mcreate=this.showdata.mcreate;
      console.log(this.mcreate);
      this.mdelete=this.showdata.mdelete
      console.log(this.mdelete);
      this.medit=this.showdata.medit
      console.log(this.medit);
    this.entryForm = this._fb.group({
      jobName:[null] ,
      jobGroup:['SureStream'] ,
      jobStatus:[null],
      jobClass:[null],
      description:[null],
      interfaceName:[null],
      repeatTime:[null],
      startTime:[null],
      cronExpression:[null],
      get_api:[null],
      post_api:[null],
      delete_api:[null]
      });
      this.getall();
  }
getall(){
this.jbmaservice.getAll().subscribe((data)=>{
  this.data=data;
  console.log(data);
  if(this.data.length==0){
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
  goToAdd() {
this.modalAdd = true;
  }
  onSubmit(){
    console.log(this.entryForm.value);
this.jbmaservice.create(this.entryForm.value).subscribe((data)=>{
  console.log(data);
  if (data) {
    this.toastr.success('Added successfully');
 }
  // if(data.operationMessage=='Your Access is Denied Plz contact Admin'){
  //   this.toastr.error('Your Access is Denied Plz contact Admin');
  //  }
},(error) => {
  console.log('Error in adding data...',+error);
  if(error){
    this.toastr.error('Not added Data Getting Some Error');
  }
}  )
this.modalAdd=false;
  }
  onEdit(row) {
    this.rowSelected = row;
    console.log(row);
    this.modalEdit = true;
  }
  onUpdate() {
    this.modalEdit = false;
    console.log( this.rowSelected );
    this.jbmaservice.update(this.rowSelected).subscribe((data) => {
        console.log(data);
        if (data) {
          this.toastr.success('Updated successfully');
       }
      // if(data.operationMessage=='Your Access is Denied Plz contact Admin'){
        //   this.toastr.error('Your Access is Denied Plz contact Admin');
        //  }
      },(error) => {
        console.log('Error in adding data...',+error);
        if(error){
          this.toastr.error('Not added Data Getting Some Error');
        }
      }
         );


}
   onDelete(row) {
    this.rowSelected = row;
     this.modaldelete=true;
  }
  delete(val){
    this.modaldelete = false;
    console.log("in delete  "+val);
    this.jbmaservice.delete(val).subscribe((data) => {
        console.log(data);
        if (data) {
          this.toastr.success('Deleted successfully');
          this.getall()
       }
      // if(data.operationMessage=='Your Access is Denied Plz contact Admin'){
        //   this.toastr.error('Your Access is Denied Plz contact Admin');
        //  }
             },(error) => {
              console.log('Error in delete data...',+error);
              if(error){
                this.toastr.error('Not Deleted Data Getting Some Error');
              }
            }
    );
     }
     pause(row){
      this.rowSelected = row;
      this.jbmaservice.pause(this.rowSelected).subscribe((data)=>{
        console.log(data);
        if(data==null){
          this.toastr.success("paused")
          this.getall()
        }
      }, (error: HttpErrorResponse)=>{
        console.log(error);
        if(error.status===400){
          this.toastr.error(error.error);
        }
      if(error.status===200){
        this.toastr.success(error.error.text);
        window.location.reload();
      }
     })
     }
     resume(row){
      this.rowSelected = row;
      this.jbmaservice.resume(this.rowSelected).subscribe((data)=>{
        console.log(data);
        if(data==null){
          this.toastr.success("Resumed")
          this.getall()
        }
      }, (error: HttpErrorResponse)=>{
        console.log(error);
        if(error.status===400){
          this.toastr.error(error.error);
        }
      if(error.status===200){
        this.toastr.success(error.error.text);
        window.location.reload();
      }
      })
     }
     runo(row){
      this.rowSelected = row;
      this.jbmaservice.runonce(this.rowSelected).subscribe((data)=>{
        console.log(data);
        if(data==null){
          this.toastr.success("Runonce")
          this.getall()
        }
      }, (error: HttpErrorResponse)=>{
        console.log(error);
        if(error.status===400){
          this.toastr.error(error.error);
        }
      if(error.status===200){
        this.toastr.success(error.error.text);
        window.location.reload();
      }
      })
     }
     gotoGrid(){
         this.router.navigate(['../sure-connector'],{relativeTo:this.route});
     }
     goTodefination(id: number){
    this.router.navigate(['../gotojobdefination/'+id],{relativeTo:this.route});
  }
}
