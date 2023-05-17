import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SchedulerService } from '../../../../services/fnd/scheduler.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  alldata;
  loading = false;
  modalAdd= false;
  error;
  dataRefreshInterval: any;
  public entryForm: FormGroup;
  constructor( private mainservice:SchedulerService,
    private _fb: FormBuilder,private toastr:ToastrService,) { }

  ngOnInit(): void {
    this.getData();
    this.entryForm = this._fb.group({
      accountId:[null] ,
      parameters:[null] ,
      job:[null] ,
      });
  }
  ngOnDestroy() {
    // Clean up the interval subscription
    clearInterval(this.dataRefreshInterval);
    console.log("clear Interval");
  }

  getData(){
    this.dataRefreshInterval = setInterval(() => {
  this.mainservice.getAll().subscribe((data) => {
    // console.log(data);
    this.alldata = data;
    if(this.alldata.length==0){
      this.error="No data Available";
      console.log(this.error)
    }
  }, (error: HttpErrorResponse)=>{
    console.log(error);
    if(error.status===404){
      this.error=error.error;
    }
    // if(error.error){
    //   this.toastr.error(error.error);
    // }
 });
}, 5000);
}


  goToAdd() {
    this.modalAdd=true;
    }
    onSubmit(){
      this.modalAdd=false;
      this.mainservice.createpipe(this.entryForm.value).subscribe(data => {
        console.log(data)
        this.ngOnInit();
      },
        (error) => {
          console.log(error);
        }
      );
    }
    data;
    requeue(id){
      console.log(id);
this.mainservice.requ(id,this.data).subscribe((data)=>{
  console.log(data);
  if(data){
    this.toastr.success("Requeue Run Succefully");
  }
},(error) => {
console.log(error);
if(error){
  this.toastr.error("Server Error");
}
})

    }
}
