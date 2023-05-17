import { Component, Input, OnInit } from '@angular/core';
import { ProjectSetup } from '../../../../models/builder/Project_setup';
import { NotificationType, Notification, NotificationService } from '../../../../services/notification.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectSetupService } from '../../../../services/builder/project-setup.service';
import { IconService } from 'src/app/services/builder/icon.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormControlName, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UserInfoService } from 'src/app/services/user-info.service';
import { MyworkspaceService } from 'src/app/services/admin/myworkspace.service';
import { DeploymentprofileService } from 'src/app/services/admin/deploymentprofile.service';
import { OptionData } from '@clr/angular/forms/combobox/providers/combobox-focus-handler.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HealthCheckupService } from 'src/app/services/admin/health-checkup.service';

@Component({
  selector: 'app-projectcard',
  templateUrl: './projectcard.component.html',
  styleUrls: ['./projectcard.component.scss']
})
export class ProjectcardComponent implements OnInit {
  rowSelected :any= {};
  tools1 = [
    {

      title: "Start from scratch, I have an idea",
      image: '/assets/images/fromscratch.png',
      action: "../project/add",
    },
    {
      title: "My DB is ready, let's import and start",
      action: "../create-table",
      image: '/assets/images/copytemplate.png',
    },

    {
      title: "Start with sampleapp, check templates",
      action: "../create-table",
      image: '/assets/images/database.png',
    },
   {
      title: "Copy from another public project",
      action: "../projectcard",
      image: '/assets/images/copyfromPrj.png',
    },
  ];
  modaladd=false;
  @Input()
  apps: Array<ProjectSetup> = [];
  projectsetup;
  type="project";
  public entryForm: FormGroup;
  public copyForm: FormGroup;
  public copydForm:FormGroup;
  public adduserform:FormGroup;
  public adduserform1:FormGroup;
  isLoading: boolean = false;
  data;
  copymodal:boolean =false;
  copydepoyment:boolean=false;
  addusermodal:boolean=false;
  user_id;
  projectname:any;
  search;
  error;
  statusClass = 'not-active';
  alldata;
  loading=false;
  allacciduser;
  allguest;
  allteam;
  error1;
  role;
  underscroprepa=/[\W_]+/;
  submitted = false;
  runningServices: string[] = [];
  notRunningServices: string[] = [];
  constructor( private notificationService: NotificationService,
    private mainService: ProjectSetupService,
    private deploymentProfile: DeploymentprofileService,
    private iconservice:IconService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private _fb: FormBuilder,
    private mywork:MyworkspaceService,
    private userInfoService:UserInfoService,
    private healthService:HealthCheckupService,) { }

  ngOnInit(): void {
    this.role=this.userInfoService.getRoles();
console.log(this.role)
    this.getData();
    this.adduserform =this._fb.group({
      project_id:[null],
      user_id:[null]
    });
    this.adduserform1 =this._fb.group({
      project_id:[null],
     // team_id:[null]
    })
    this.entryForm = this._fb.group({
      type: [this.type],
      objectId: [null],

    });
    this.copyForm =this._fb.group({
      from_projectId:[null],
      to_projectName:[null],
      to_tech_stack:[null]
    });
this.copydForm=this._fb.group({
  project:['',[Validators.required]],
  deplomentprofile:['',[Validators.required]],
  msg:['',[Validators.required]],
  newprojectname:['', [Validators.required, this.noWhitespaceValidator, this.nounderscoreValidator ]],
  repo_cond:['',[Validators.required]],
});
this.getdeploymentprofileAll();
    // getalluserid
    this.user_id = this.userInfoService.getUserId();
    console.log('user id: ' + this.user_id);
    this.getalluserid(this.user_id);
  }
   noWhitespaceValidator(control: FormControl) {
    const isSpace = (control.value || '').match(/\s/g);
    return isSpace ? {'whitespace': true} : null;
}
nounderscoreValidator(control: FormControl) {
  const isunder = (control.value || '').match(/[\W_]+/);
  return isunder ? {'under': true} : null;
}
projectfind1;
projectfind(val){
  val = this.projectsetup.filter(
    project => project.projectName === this.copydForm.value.newprojectname);
    console.log(val);

    for(let ts of val)
     {
       if(ts.projectName==null)
       {
         return;
       }
      console.warn(ts.projectName);
      this.projectfind1=ts.projectName;
      }
      if (val.length== 0){
        this.projectfind1=null;
      }

    return true;
}
projetnamefind(control:FormControl){
  //const valid=(control.value || '').match(this.projectsetup.projectName);
  //return  valid ?{'not valid':true}:null;
}
  getalluserid(id:any){
    this.isLoading = true;
    this.mainService.getallbyuserid(id).subscribe((data) => {
      this.isLoading = false;
      console.log(data);
      this.data = data;
    },(error) => {
      console.log(error);
      if(error){
       this.error="No data Available OR server Error";
     }
    });
  }
  er;
  arrayTag;
  getData() {
    this.mainService.getallmyproject().subscribe((data) => {
      console.log(data);
      this.projectsetup = data;
     // this.arrayTag = JSON.parse(this.projectsetup.tags);
      console.log("array tag data ",this.arrayTag);

      if(data.length == 0){
        this.er="No data Available";
        console.log(this.er);
      }
     // this.projectsetup = data.items;
      this.projectname=data.projectname;
    },(error) => {
      console.log(error);
      if(error){
       this.error="No data Available OR server Error";
     }
    });
  }
  showNotification(message: string, messageDetails: string) {
    this.notificationService.add(
      new Notification(
        NotificationType.Info,
        message,
        messageDetails
      )
    )
  }
  addfav(id:any){
    this.entryForm.value.objectId=id
    console.log(this.entryForm.value);
    this.statusClass = 'active';
    this.iconservice.create(this.entryForm.value).subscribe((data)=>{
      console.log(data);
      if (data.success) {
        this.toastr.success('Added Favourite');
            }
    },(error) => {
      console.log('Error in adding data...',+error);
      if(error){
        this.toastr.error('Not added Data Getting Some Error');
      }
    })
    let btn1 = document.getElementById('heart');
    btn1.addEventListener('click', function() {
      btn1.style.color = "red";
  });
  }
  removefav(id:any){
    console.log("in delete  "+id);
    this.iconservice.delete(id).subscribe((data)=>{
      console.log(data);
      if (data.success) {
        this.toastr.success('Remove Favourite');
            }
    },(error) => {
      console.log('Error in adding data...',+error);
      if(error){
        this.toastr.error('Not Removed Data Getting Some Error');
      }
    })
  }
  addpin(id:any){
    this.entryForm.value.objectId=id
    console.log(this.entryForm.value);
    this.iconservice.createpin(this.entryForm.value).subscribe((data)=>{
      console.log(data);
      if (data.success) {
        this.toastr.success('Added Pinned');
            }
    },(error) => {
      console.log('Error in adding data...',+error);
      if(error){
        this.toastr.error('Not Added Data Getting Some Error');
      }
    })
  }
  removepin(id:any){
    console.log("in delete  "+id);
    this.iconservice.deletepin(id).subscribe((data)=>{
      console.log(data);
      if (data.success) {
        this.toastr.success('Removed Pinned');
            }
    },(error) => {
      console.log('Error in adding data...',+error);
      if(error){
        this.toastr.error('Not Removed Data Getting Some Error');
      }
    })
  }
  addstar(id:any){
    this.entryForm.value.objectId=id
    console.log(this.entryForm.value);
    this.iconservice.createstar(this.entryForm.value).subscribe((data)=>{
      console.log(data);
      if (data.success) {
        this.toastr.success('Added Stared');
            }
    },(error) => {
      console.log('Error in adding data...',+error);
      if(error){
        this.toastr.error('Not Added Data Getting Some Error');
      }
    })
  }
  removestar(id:any){
    console.log("in delete  "+id);
    this.iconservice.deletestar(id).subscribe((data)=>{
      console.log(data);
      if (data.success) {
        this.toastr.success('Removed Stared');
            }
    },(error) => {
      console.log('Error in adding data...',+error);
      if(error){
        this.toastr.error('Not Removed Data Getting Some Error');
      }
    })
  }
  addwatch(id:any){
    this.entryForm.value.objectId=id
    console.log(this.entryForm.value);
    this.iconservice.createwatch(this.entryForm.value).subscribe((data)=>{
      console.log(data);
      if (data.success) {
        this.toastr.success('Added WatchList');
            }
    },(error) => {
      console.log('Error in adding data...',+error);
      if(error){
        this.toastr.error('Not Added Data Getting Some Error');
      }
    })
  }
  removewatch(id:any){
    console.log("in delete  "+id);
    this.iconservice.deletewatch(id).subscribe((data)=>{
      console.log(data);
      if (data.success) {
        this.toastr.success('Removed WatchList');
            }
    },(error) => {
      console.log('Error in adding data...',+error);
      if(error){
        this.toastr.error('Not Removed Data Getting Some Error');
      }
    })
  }
  addfuture(id:any){
    this.entryForm.value.objectId=id
    console.log(this.entryForm.value);
    this.iconservice.createfuture(this.entryForm.value).subscribe((data)=>{
      console.log(data);
      if (data.success) {
        this.toastr.success('Added Futuristic');
            }
    },(error) => {
      console.log('Error in adding data...',+error);
      if(error){
        this.toastr.error('Not Added Data Getting Some Error');
      }
    })
  }
  removefuture(id:any){
    console.log("in delete  "+id);
    this.iconservice.deletefuture(id).subscribe((data)=>{
      console.log(data);
      if (data.success) {
        this.toastr.success('Removed Futuristic');
            }
    },(error) => {
      console.log('Error in adding data...',+error);
      if(error){
        this.toastr.error('Not Removed Data Getting Some Error');
      }
    })
  }
  addarchived(id:any){
    this.entryForm.value.objectId=id
    console.log(this.entryForm.value);
    this.statusClass = 'active';
    this.iconservice.createarch(this.entryForm.value).subscribe((data)=>{
      console.log(data);
      if (data.success) {
        this.toastr.success('Added Archieved');
            }
    },(error) => {
      console.log('Error in adding data...',+error);
      if(error){
        this.toastr.error('Not added Data Getting Some Error');
      }
    })

  }
  goToAdd(row) {
    this.modaladd=true;
    // if(this.role.includes('ProjectManager')){
    //   this.modaladd=false;
    // }
  //   if(this.role.indexOf("ProjectManager") !== -1){
  //     alert("ProjectManager exists!")
  //     this.modaladd=true;
  // }
  // else{
  //   alert("Your Not Authorized To Access This Endpoint plz Contact Admin");
  //   this.modaladd=false;
  // }

   // this.router.navigate(["../project/add"], { relativeTo: this.route });
  }
  goToedit(id: number) {
    this.router.navigate(["../project/edit/" + id], { relativeTo: this.route });
  }
  goToModule(id: number,name:any) {
    this.router.navigate(["../modulecard"], { relativeTo: this.route, queryParams: { p_id: id } });
  }
  goTosureops(id:number){
    this.router.navigate(["../module1"], { relativeTo: this.route, queryParams: { p_id: id } });
  }
  // goToModule(id: number) {
  //   this.router.navigate(["../module1"], { relativeTo: this.route, queryParams: { p_id: id } });
  // }
  goTogrid(){
    this.router.navigate(["../project/all"], { relativeTo: this.route });
  }
  gotosureboard(id:any){
    console.log(id);
    this.router.navigate(["../sureboard"],{relativeTo: this.route, queryParams: { pid: id }});
  }
  gotosureops(id:any,data:any){
    this.mainService.storeaddeditvalues(data);
    console.log(data);
    this.router.navigate(["../module1"],{relativeTo: this.route, queryParams: { pid: id }});
  }
  gotomenu(){
    // this.router.navigate(["../projectview"], { relativeTo: this.route,  });
   // document.getElementById('div2').style.display = 'block';
    if (document.getElementById('div2').style.display = 'none') {
      document.getElementById('div2').style.display = 'block';
  }
}
pid;
adduser(id){
  this.pid=id;
this.addusermodal=true;
this.getuserallacid();
this.getallguest();
this.getallteam();
this.alluserdata(this.pid);
}
alluserdata(id:any){
  console.log(id);
  this.mywork.getallsecworkspace(id).subscribe((data)=>{
    this.alldata=data;
    console.log(this.alldata);
    // if(data === []){
    //   this.error1="No data Available for this Project";
    // }
  },(error) => {
    console.log(error);
    if(error){
     this.error1="No data Available for this Project";
   }
  })
}
getuserallacid(){
  this.mywork.getallusertosameaccid().subscribe((data)=>{
    this.allacciduser=data;
    console.log(this.allacciduser);
  })
}
getallguest(){
  this.mywork.getallguest().subscribe((data)=>{
this.allguest=data;
console.log(this.allguest);
  })
}
getallteam(){
  this.mywork.getall().subscribe((data)=>{
    this.allteam=data;
    console.log(this.allteam);
  })
}
userid;
change(val){
  console.log(val);
  this.adduserform.value.project_id =this.pid;
  this.adduserform.value.user_id =val;
this.userid=val;
}
userid1;
change2(val){
  console.log(val);
  this.adduserform.value.project_id =this.pid;
  this.adduserform.value.user_id =val;
  this.userid1=val;
}
tid;
change3(val){
  console.log(val);
this.tid=val
  this.adduserform1.value.project_id =this.pid;
  //this.adduserform1.value.team_id =val;
}
adduser1(){
  console.log(this.adduserform.value)
  console.log(this.userid);
this.mywork.addsecworkspaceuser(this.userid,this.pid,this.adduserform.value).subscribe((data)=>{
  console.log(data);
  if(data){
    this.toastr.success("Added user Sucessfully");
  }
},(error) => {
  console.log('Error in adding data...',+error);
  if(error){
    this.toastr.error('Not Added Data Getting Some Error');
  }
})
}
adduser2(){
  console.log(this.adduserform.value)
this.mywork.addsecworkspaceuser(this.userid1,this.pid,this.adduserform.value).subscribe((data)=>{
  console.log(data);
  if(data){
    this.toastr.success("Added Guest Sucessfully");
  }
},(error) => {
  console.log('Error in adding data...',+error);
  if(error){
    this.toastr.error('Not Added Data Getting Some Error');
  }
})
}
adduser3(){
  console.log(this.adduserform1.value)
this.mywork.addsecworkteam(this.pid,this.tid,this.adduserform1.value).subscribe((data)=>{
  console.log(data);
  if(data){
    this.toastr.success("Added Team Sucessfully");
  }
},(error) => {
  console.log('Error in adding data...',+error);
  if(error){
    this.toastr.error('Not Added Data Getting Some Error');
  }
})
}
dataopen;
opencopym(data){
  console.log(data);
  this.dataopen=data;
  this.copymodal=true;
}

onCreate(){
  this.copyForm.value.from_projectId=this.dataopen.id;
console.log(this.copyForm.value.from_projectId);
this.copyForm.value.to_tech_stack=this.dataopen.techStackId;
  console.log(this.copyForm.value);
this.mainService.copy(this.copyForm.value).subscribe((data)=>{
  console.log(data);
  if (data) {
   this.toastr.success('Copied successfully');
}
if(data.operationMessage=='Your Access is Denied Plz contact Admin'){
  this.toastr.error('Your Not Authorized To Access This Endpoint plz Contact Admin');
  }
},(error) => {
  console.log('Error in adding data...',+error);
    if(error){
      this.toastr.error('Not Copied Data Getting Some Error');
    }
});
this.copymodal=false;
}

build(id:any){
  this.mainService.build(id).subscribe((data)=>{
    console.log(data);
    if (data) {
      this.toastr.success('Build successfully');
   }
  })
}
alldeploy;
getdeploymentprofileAll() {
  this.deploymentProfile.getalllines().subscribe((data)=>{
    console.log("All data ",data);
    this.alldeploy = data;

  },(error) => {
   console.log(error);
   if(error){
    this.error="Server Error";
  }
 });
}
idselected(val){
  this.copydForm.value.deplomentprofile=val;
}
//health checkup
modalcheckup=false;
checkData;
       goToDeploy(row:string){
        this.modalcheckup = true;
        this.checkData = row;
        this.getHealthCheck(row);
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
        // return this.data.reduce((count, user) => user.deployApp ? count + 1 : count, 0);
        // if (this.data) {
        //   return this.data.reduce((acc, user) => user.deployApp ? acc + 1 : acc, 0);
        // } else {
        //   return 0;
        // }
      }
    
      get failCount() {
        return this.notRunningServices.length;
        // return this.data.reduce((count, user) => !user.deployApp ? count + 1 : count, 0);
        // if (this.data) {
        //   return this.data.reduce((acc, user) => !user.deployApp ? acc + 1 : acc, 0);
        // } else {
        //   return 0;
        // }
      }
    
      get totalCount() {
        // return this.data.length;
        // return this.data ? this.data.length : 0;
        return this.runningServices.length + this.notRunningServices.length
      }
      
gotocopymodal(row){
  this.modalcheckup = true;
        this.checkData = row;
        this.getHealthCheck(row);
// this.copydepoyment=true;
}
openCopy(){
  this.modalcheckup = false;
  this.copydepoyment=true;
}
copydata;
onCopyd(){
  // this.submitted = true;
  // if (this.copydForm.invalid) {
  //   return;
  // }
console.log(this.copydForm.value);
this.mainService.copydeployment(this.copydForm.value.project,this.copydForm.value.deplomentprofile,this.copydForm.value.msg,this.copydForm.value.newprojectname, this.copydForm.value.repo_cond).subscribe((data)=>{
  console.log(data);
  this.copydata=data;
  if(this.copydata.operationMessage=='connection refused please start server'){
    this.toastr.error('connection refused please start server');
    this.getData();
   }
   if(this.copydata.operationStatus=="WARNING"){
    this.toastr.error('connection refused please start server');
    this.getData();
   }
  if(this.copydata.success.message){
    this.toastr.success(this.copydata.success.message);
    this.getData();
    //this.data.success(data.operationMessage)
  }
},(error:HttpErrorResponse) => {
  console.log(error);
  if(error.status==201){
   this.toastr.success(error.error.text);
   this.getData();
 }
 if(error.status==404){
  this.toastr.error(error.error);
}

})
this.copydForm.reset();
this.copydepoyment=false;
}

   changeGender(e) {
    console.log(e.target.value);
    this.copydForm.value.repo_cond=e.target.value;
    console.log( this.copydForm.value.repo_cond);
  }
}
