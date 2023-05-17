import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataflowService } from 'src/app/services/fnd/dataflow.service';

@Component({
  selector: 'app-surejob1',
  templateUrl: './surejob1.component.html',
  styleUrls: ['./surejob1.component.scss']
})
export class Surejob1Component implements OnInit {
  
  modalAdd= false;
  modalAdd1=false;
  public entryForm: FormGroup;
  public entryForm1: FormGroup;
  alldata;
  loading = false;
  rowSelected :any= {};
  modaldelete=false;
  modaldelete1=false;
  modalEdit=false;
  error;
  line_Id
  constructor( private _fb: FormBuilder,private router: Router,private toastr: ToastrService,
    private route: ActivatedRoute,private dataservice:DataflowService,) { }

  ngOnInit(): void {
    // this.line_Id = this.route.snapshot.params["id"];
    // console.log("update with id = ", this.line_Id);
    this.route.queryParams.subscribe(params => {
      this.line_Id = params['entityId'];
      // Do something with the ID, e.g. fetch data using it
    });

    this.entryForm = this._fb.group({
      // counter: [null],
       gapDuration: [null],
       startTime: [null],
       jobName:[null],
       jobGroup: [null],
       cronExpression: [null]
         });
         this.getall();
  }

  getall(){
    this.dataservice.getAllsurejob(this.line_Id).subscribe((data)=>{
      console.log(data);
      this.alldata=data;
      if(this.alldata.length==0){
        this.error="No data Available";
        console.log(this.error)
      }
    },(error) => {
      console.log(error);
      if(error){
       this.error="Server Error";
     }
    });
  }
  goToAdd() {
    this.modalAdd=true;
    }
    onSubmit(){
      this.modalAdd=false;
      console.log(this.entryForm.value);
      this.dataservice.createsceduler(this.entryForm.value).subscribe(data => {
        console.log(data)
        this.ngOnInit();
      },
        (error) => {
          console.log(error);
        }
      );
    }
    onEdit(row) {
      this.rowSelected = row;
      console.log(row);
      this.modalEdit = true;
    }
    onUpdate() {
      this.modalEdit = false;
      console.log( this.rowSelected );
      this.dataservice.updatesurejob(this.rowSelected).subscribe((data) => {
          console.log(data);
          if (data) {
            this.toastr.success('Updated successfully');
         }
         this.getall();
        },(error) => {
          console.log('Error in updating data...',+error);
          if(error){
            this.toastr.error('Not update Data Getting Some Error');
          }
        });


  }
    onDelete(row) {
      this.rowSelected = row;
       this.modaldelete=true;
    }
    delete(val){
      this.modaldelete = false;
      console.log("in delete  "+val);
      this.dataservice.deletesurejob(val).subscribe((data) => {
          console.log(data);
          if (data) {
            this.toastr.success('Deleted successfully');
            this.getall();
         }
               },(error) => {
                if(error){
                  this.toastr.success('Deleted successfully');
                  this.getall();
                }
                // if(error){
                //   this.toastr.error('Not Deleted Data Getting Some Error');
                // }
        });
       }
       pause(row){
        this.rowSelected = row;
        this.dataservice.pause(this.rowSelected).subscribe((data)=>{
          console.log(data);

          if(data==null){
            this.toastr.success("paused")
            this.getall();
          }
        }, (error: HttpErrorResponse)=>{
          console.log(error);
          if(error.status===400){
            this.toastr.error(error.error);
          }
        if(error.status===200){
          this.toastr.success(error.error.text);
          // window.location.reload();
          this.getall();
        }
       })
       }
       resume(row){
        this.rowSelected = row;
        this.dataservice.resume(this.rowSelected).subscribe((data)=>{
          console.log(data);

          if(data==null){
            this.toastr.success("Resumed")
            this.getall();
          }
        }, (error: HttpErrorResponse)=>{
          console.log(error);
          if(error.status===400){
            this.toastr.error(error.error);
          }
        if(error.status===200){
          this.toastr.success(error.error.text);
          // window.location.reload();
          this.getall();
        }
       })
       }
       runo(row){
        this.rowSelected = row;
        this.dataservice.runonce(this.rowSelected).subscribe((data)=>{
          console.log(data);
          //this.ngOnInit();
          if(data==null){
            this.toastr.success("Runonce")
            this.getall();
          }
        }, (error: HttpErrorResponse)=>{
          console.log(error);
          if(error.status===400){
            this.toastr.error(error.error);
          }
        if(error.status===200){
          this.toastr.success(error.error.text);
          // window.location.reload();
          this.getall();
        }
       })
       }
       cron=false;
       cronOpen(){
        this.cron=true;
       }
}

