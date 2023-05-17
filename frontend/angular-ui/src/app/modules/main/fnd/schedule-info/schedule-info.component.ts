import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SchedulerService } from '../../../../services/fnd/scheduler.service';

@Component({
  selector: 'app-schedule-info',
  templateUrl: './schedule-info.component.html',
  styleUrls: ['./schedule-info.component.scss']
})
export class ScheduleInfoComponent implements OnInit {
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
  codeMirrorOptions: any = {
    theme: "lint",
    mode:"text/x-java",
    lineNumbers: true,
    //noNewlines: true,
    lineSeparator: "\n",
    lineWrapping: true,
    foldGutter: true,
    gutters: [
      "CodeMirror-linenumbers",
      "CodeMirror-foldgutter",
      "CodeMirror-lint-markers",
    ],
    autoCloseBrackets: true,
    extraKeys: { "Ctrl-Space": "autocomplete" },
    matchBrackets: true,
    lint: true,
  };
  constructor(private mainservice:SchedulerService,private toastr: ToastrService,
    private _fb: FormBuilder,private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getall();
    this.entryForm = this._fb.group({
   // counter: [null],
    gapDuration: [null],
    startTime: [null],
    jobName:[null],
    jobGroup: [null],
    cronExpression:[null]
      });
      this.entryForm1 = this._fb.group({
         filename: [null],

           });
      this.getallfile();
  }
  getall(){
    this.mainservice.getAllsceduler().subscribe((data) => {
      console.log(data);
      this.alldata = data;
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
  allfiledata;
  getallfile(){
    this.mainservice.getalllogfile().subscribe((data)=>{
      console.log(data);
this.allfiledata=data;
if(this.allfiledata.length == 0){
  this.error="No data Available";
}
if(this.allfiledata.operationMessage =='Your Access is Denied Plz contact Admin'){
  this.toastr.error('Your Not Authorized To Access This Endpoint plz Contact Admin');

 }
    })
  }
  goToAdd() {
    this.modalAdd=true;
    }
    onSubmit(){
      this.modalAdd=false;
      console.log(this.entryForm.value);
      this.mainservice.createsceduler(this.entryForm.value).subscribe(data => {
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
      this.mainservice.update(this.rowSelected).subscribe((data) => {
          console.log(data);
          if(data){
            this.toastr.success('Deleted successfully');
            this.getall();
          }
        },
           );


  }
    onDelete(row) {
      this.rowSelected = row;
       this.modaldelete=true;
    }
    delete(val){
      this.modaldelete = false;
      console.log("in delete  "+val);
      this.mainservice.delete(val).subscribe((data) => {
          console.log(data);
          if (data) {
            this.toastr.success('Deleted successfully');
            this.getall()
         }
        },(error) => {
          console.log('Error in delete data...',+error);
          if(error){
            this.toastr.error('Not Deleted Data Getting Some Error');
          }
        });
       }
       pause(row){
        this.rowSelected = row;
        this.mainservice.pause(this.rowSelected).subscribe((data)=>{
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
        this.mainservice.resume(this.rowSelected).subscribe((data)=>{
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
        this.mainservice.runonce(this.rowSelected).subscribe((data)=>{
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
       read(id:any){
        this.router.navigate(["/cns-portal/schedulerlogreader"],{ relativeTo: this.route, queryParams: {id: id } });

       }
       goToAdd1() {
        this.modalAdd1=true;
        }
       create(){
this.mainservice.createfile(this.entryForm1.value.filename).subscribe((data)=>{
  console.log(data);
});
this.modalAdd1=false;
       }
       onDelete1(row) {
        this.rowSelected = row;
         this.modaldelete1=true;
      }
      delete1(val){
        this.modaldelete1 = false;
        console.log("in delete  "+val);
        this.mainservice.deletefile(val).subscribe((data) => {
            console.log(data);
                 },(error: HttpErrorResponse)=>{
                  console.log(error);
                  if(error.status===400){
                    this.toastr.error(error.error);
                  }
                if(error.status===200){
                  this.toastr.success(error.error.text);
                  window.location.reload();
                }
               } );
         }
         fileData:any={};
clickfile(id:any){
  this.mainservice.readlogfile(id).subscribe((data)=>{
    console.log(data);
    this.fileData = data;

  },(error:HttpErrorResponse) => {
    console.log(error);
    if(error.status==200){
     this.fileData=error.error;
   }
   if(error.status==404){
    this.toastr.error(error.error);
  }
  if(error.status==417){
    this.toastr.error(error.error);
  }
  })
}
}
