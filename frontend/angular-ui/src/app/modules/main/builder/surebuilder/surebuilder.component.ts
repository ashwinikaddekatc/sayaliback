import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SureopsService } from 'src/app/services/builder/sureops.service';
import { ToastrService } from 'ngx-toastr';
import { DeploymentprofileComponent } from '../../admin/deploymentprofile/deploymentprofile.component';
import { DeploymentprofileService } from 'src/app/services/admin/deploymentprofile.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { WorkflowDataService } from 'src/app/services/fnd/workflow-data.service';
import { HealthCheckupService } from 'src/app/services/admin/health-checkup.service';

@Component({
  selector: 'app-surebuilder',
  templateUrl: './surebuilder.component.html',
  styleUrls: ['./surebuilder.component.scss']
})
export class SurebuilderComponent implements OnInit, OnDestroy {
  projectId;
  prrofileData;
  devlopmentPrfile = false;
  modalsetting:boolean=false;
  loading = false;
  loadingIndicator = true;
  reorderable = true;
  errorco;
  selectedProfileName;
fileList;
selected;
error;
alldeploy;
copydepoyment:boolean=false;
workflow_data;
editable: boolean = true;
selectedprofileid=3;
dataRefreshInterval: any;
runningServices: string[] = [];
notRunningServices: string[] = [];
public copyForm: FormGroup;
  constructor(private router: Router,
    private route:ActivatedRoute,private workflowserive:WorkflowDataService,
    private suropsService:SureopsService,
    private toastr:ToastrService,private _fb: FormBuilder,
    private deployemntProfile:DeploymentprofileService,
    private healthService:HealthCheckupService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.projectId = +params['pid'];
      console.log("Project ID ",this.projectId);
    });
   
      this.getall();
this.getdeploymentprofileAll();
this.copyForm =this._fb.group({
  copy_from:[null],
  Deployment_profile:[4],
  commit_msg:[null],
  Sure_filepath:[]
});
this.getallworkflow();
  }
  ngOnDestroy() {
    // Clean up the interval subscription
    clearInterval(this.dataRefreshInterval);
  }

  
getall() {
  this.dataRefreshInterval = setInterval(() => {
    this.suropsService.getallfile(this.selectedprofileid, this.projectId).subscribe(
      (data) => {
        // console.log(data);
        this.fileList = data;
        //this.ngOnInit();
        if (this.fileList.length > 0) {
          clearInterval(this.dataRefreshInterval);
        }
        if (this.fileList.length == 0) {
          this.error = "No data Available, refresh the page";
          //console.log(this.error);
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        if (error.status === 200) {
          this.toastr.error(error.error);
          this.error = "Server Error";
          //this.error=error.error;
        }

        // if(error.error){
        //   this.toastr.error(error.error);
        // }
        if (error) {
          this.error = "Some error occurred";
          clearInterval(this.dataRefreshInterval);
        }
      }
    );
  }, 2000);
}
      getdeploymentprofileAll() {
        this.deployemntProfile.getAll().subscribe((data)=>{
          console.log("All data ",data);
          this.alldeploy = data;

        },(error) => {
         console.log(error);
         if(error){
          this.error="Server Error";
        }
       });
      }
  goTproject(){
    // this.router.navigate(["../projectview"], { relativeTo: this.route,  });
     if (document.getElementById('Div1')) {

       if (document.getElementById('Div1').style.display == 'none') {
           document.getElementById('Div1').style.display = 'block';
           document.getElementById('Div2').style.display = 'none';


       }
       else {
           document.getElementById('Div1').style.display = 'none';
           document.getElementById('Div2').style.display = 'block';

       }
   }
   }
   goTorepo(){
     if (document.getElementById('Div2')) {

       if (document.getElementById('Div2').style.display == 'none') {
           document.getElementById('Div2').style.display = 'block';
           document.getElementById('Div1').style.display = 'none';
       }
       else {
           document.getElementById('Div2').style.display = 'none';
           document.getElementById('Div1').style.display = 'block';
       }
   }
   }
   getallworkflow(){
    this.workflowserive.getcallall().subscribe((data)=>{
      console.log(data);
      this.workflow_data = data;
      if(data.length==0){
        this.error="No data Available plz add if Required";
        console.log(this.error)
      }
    },(error) => {
      console.log(error);
      if(error){
       this.error="Server Error";
     }
    });
  }
  createFile()
  {
      this.suropsService.create(this.projectId,this.selectedprofileid).subscribe((data)=>{
       console.log("Folder created sucessfully");
       this.ngOnInit();
       if (data) {
         this.toastr.success('Folder created sucessfully');
       }
      },
      (error: HttpErrorResponse)=>{
         console.log(error);
         if(error.status===200){
           this.toastr.success(error.error.text);
         }
         console.log(this.selectedprofileid,this.projectId)
         // setTimeout(() => {
         //   this.ngOnInit();
         //  }, 5000);
          this.ngOnInit();
         // if(error.error){
         //   this.toastr.error(error.error);
         // }
      });
  }
   DeleteFile(){
    this.suropsService.delete(this.selectedprofileid,this.projectId).subscribe((data)=>{
      console.log("Folder deleted sucessfully",data);
      this.ngOnInit();
      // if (data) {
      //   this.toastr.success('Folder created sucessfully');
      // }
     },
     (error: HttpErrorResponse)=>{
        console.log(error);
        if(error.status===200){
          this.toastr.success(error.error.text);
        }
       this.ngOnInit();
        // if(error.error){
        //   this.toastr.error(error.error);
        // }
     });
  }
   gotocopymodal(){
    this.copydepoyment=true;
    }
   createscript() {
    console.log(this.copyForm.value);
       this.suropsService.createscript(this.projectId,this.selectedprofileid,this.copyForm.value.copy_from,this.copyForm.value.Deployment_profile,this.copyForm.value.commit_msg,this.copyForm.value.Sure_filepath).subscribe((data)=>{
        console.log(data);
        this.ngOnInit();
        if (data) {
          //this.toastr.success('Script created sucessfully');
        }
       },
       (error)=>{
          console.log(error);
          // if(error){
          //   this.toastr.error('Folder not created ');
          // }
       });
   }

   openProfileTable()
   {
      this.devlopmentPrfile = true;
      this.deployemntProfile.getAll().subscribe((data)=>{
        console.log("profile data ",data);
        this.prrofileData = data;
        if(this.fileList.length==0){
          this.error="No data Available";
          console.log(this.error)
        }
      },(error:HttpErrorResponse) => {
        console.log(error);
        if(error.status==404){
         this.toastr.error(error.error);
         this.error=error.error;
       }
      });
   }

   profilename(name)
   {
      console.log(name);
      this.selectedProfileName = name.profile_name;
      this.selectedprofileid=name.id;
      console.log(this.selectedprofileid);
      this.ngOnInit();
      this.devlopmentPrfile = false;
   }
   fileedit(){
     this.router.navigate(['/cns-portal/fileeditor']);
   }
   read(id:any){
    this.router.navigate(["/cns-portal/fileeditor"],{ relativeTo: this.route, queryParams: {id: id } });
   }
   builddata;
   build(){
    this.suropsService.build(this.projectId).subscribe((data)=>{
      console.log(data);
      this.builddata=data;
      if (this.builddata.operationStatus=='WARNING') {
        this.toastr.error(this.builddata.operationMessage);
     }
    },(error:HttpErrorResponse) => {
      console.log(error);
      if(error.status==404){
       this.toastr.error("Getting Error");
     }
if(error.status==200){
  this.toastr.success(error.error.text);
}
    })
  }
  // build1(){
  //   this.router.navigate(['/cns-portal/builddetails']);
  // }
  deploy(){
    this.suropsService.deploy(this.projectId).subscribe((data)=>{
      console.log(data);
      if (data) {
        this.toastr.success('Deploy successfully');
     }
    },(error:HttpErrorResponse) => {
      console.log(error);
if(error.status==200){
  this.toastr.success(error.error.text);
}
if(error.status==404){
  this.toastr.error(error.error);
}
    })
  }
  // open(){
  //   window.open(`http://43.205.154.152:30202/#/login`);
  // }
  selemval:any={};
  modal(val){
    console.log(val);
    this.modalsetting=true;
    this.getallworkflow();
    this.selemval=JSON.parse(val.model);
      console.log(this.selemval);
  }
  webUrl(val){
    window.open(val)
  }

  modalcheckup=false;
checkData;

        buildCheck(row){
          this.modalcheckup = true;
                this.checkData = row;
                this.getHealthCheck(row);
        // this.copydepoyment=true;
        }
        createFileCheck(row){
          this.modalcheckup = true;
                this.checkData = row;
                this.getHealthCheck(row);
        }
        deployCheck(row){
          this.modalcheckup = true;
          this.checkData = row;
          this.getHealthCheck(row);
        }
        proceed(){
          if(this.checkData === 'build_project'){
            this.modalcheckup = false;
          this.build()
          }else if(this.checkData === 'create_deployment'){
            this.modalcheckup = false;
            this.createFile()
            }else if(this.checkData === 'deploy_app'){
              this.modalcheckup = false;
              this.deploy()
              }
        }

       getHealthCheck(jsonType:string): void {
        this.healthService.getHealthCheckup(jsonType).subscribe((data: any) => {
          console.log(data);
          this.runningServices = data.runningServices;
          this.notRunningServices = data.notRunningServices;
          console.log(this.runningServices);
          console.log(this.notRunningServices);
        });
      }
       get passCount() {
        return this.runningServices.length;
      }
    
      get failCount() {
        return this.notRunningServices.length;
      }
    
      get totalCount() {
        return this.runningServices.length + this.notRunningServices.length
      }

}
