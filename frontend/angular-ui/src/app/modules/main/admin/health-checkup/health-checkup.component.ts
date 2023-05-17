import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MenuGroupService } from 'src/app/services/admin/menu-group.service';
import { HealthCheckupService } from 'src/app/services/admin/health-checkup.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-health-checkup',
  templateUrl: './health-checkup.component.html',
  styleUrls: ['./health-checkup.component.scss']
})
export class HealthCheckupComponent implements OnInit {
  submitted = false;
  rowSelected :any= {};
    modaldelete=false;
    modalEdit=false;
    modalAdd= false;
    modalDeploy = false;
    public entryForm: FormGroup;
    error;
    loading = false;
    data;
    selected: any[] = [];
    showdata;
    runningServices: string[] = [];
    notRunningServices: string[] = [];
    selectedFile1:File[] = [];
    selectedFile2:File[] = [];
    selectedFile3:File[] = [];
    constructor( private route: ActivatedRoute,
      private _fb: FormBuilder,
      private toastr: ToastrService,
      private healthService:HealthCheckupService,
      private router: Router) { }
  
    ngOnInit(): void {
      this.entryForm = this._fb.group({
        ip:[null,[Validators.required]] ,
        port:[null,[Validators.required]],
        serviceName:[null,[Validators.required]],
        createProject:[null],
        buildProject:[null],
        createDeployment:[null],
        deployApp:[null],
        });
        this.getall();
        // this.getHealthCheck();
    }
  getall(){
  this.healthService.getHealthCheckups().subscribe((data)=>{
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

    public onFileChanged1(event) {
      //Select File
      console.log(event);
      this.selectedFile1 = event.target.files[0];
    }
    public onFileChanged2(event) {
      //Select File
      console.log(event);
      this.selectedFile2 = event.target.files[0];
  
    }
    public onFileChanged3(event) {
      //Select File
      console.log(event);
      this.selectedFile3 = event.target.files[0];
  
    }
    onSubmit(){
      
      if (this.entryForm.invalid) {
        this.submitted = true;
        return;
      }else{
        this.modalAdd = false;
      }
      console.log(this.entryForm.value);
  this.healthService.saveHealthCheckup(this.entryForm.value).subscribe((data)=>{
    console.log(data);
    if (data) {
      this.toastr.success('Added successfully');
      this.getall();
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
    onUpdate(id) {
      this.modalEdit = false;
      console.log( this.rowSelected );
      this.healthService.updateHealthCheckup(id,this.rowSelected).subscribe((data) => {
          console.log(data);
          if (data) {
            this.toastr.success('Updated successfully');
            this.getall();
         }
        },(error) => {
          console.log('Error in Update data...',+error);
          if(error){
            this.toastr.error('Not Update Data Getting Some Error');
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
      this.healthService.deleteHealthCheckup(val).subscribe((data) => {
          console.log(data);
          if (data) {
            this.toastr.success('Deleted successfully');
            this.getall();
         }
               },(error) => {
                console.log('Error in delete data...',+error);
                if(error){
                  this.toastr.error('Not Deleted Data Getting Some Error');
                }
              });
       }

// checkData;
//        goToDeploy(row:string){
//         this.modalDeploy = true;
//         this.checkData = row;
//         this.getHealthCheck(row);
//        }
//        getHealthCheck(jsonType:string): void {
//         this.healthService.getHealthCheckup(jsonType).subscribe((data: any) => {
//           console.log(data);
//           this.runningServices = data.runningServices;
//           this.notRunningServices = data.notRunningServices;
//           console.log(this.runningServices);
//           console.log(this.notRunningServices);
//         });
//       }
//        get passCount() {
//         // return this.data.filter(user => user.deployApp).length;
//         // return this.data.reduce((count, user) => user.deployApp ? count + 1 : count, 0);
//         if (this.data) {
//           return this.data.reduce((acc, user) => user.deployApp ? acc + 1 : acc, 0);
//         } else {
//           return 0;
//         }
//       }
    
//       get failCount() {
//         // return this.data.filter(user => !user.deployApp).length;
//         // return this.data.reduce((count, user) => !user.deployApp ? count + 1 : count, 0);
//         if (this.data) {
//           return this.data.reduce((acc, user) => !user.deployApp ? acc + 1 : acc, 0);
//         } else {
//           return 0;
//         }
//       }
    
//       get totalCount() {
//         // return this.data.length;
//         return this.data ? this.data.length : 0;
//       }
      
//       getButtonLabel() {
//         const passCount = this.passCount;
//         const totalCount = this.totalCount;
      
//         if (passCount === totalCount) {
//           return "Proceed";
//         } else {
//           return "Create SR";
//         }
//       }
  }
  
