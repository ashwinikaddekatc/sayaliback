import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectSetupService } from 'src/app/services/builder/project-setup.service';
import { TechnologyStackService } from 'src/app/services/builder/technology-stack.service';
//import { ValidationError} from '../../../../models/ValidationError';
import { AlertService } from '../../../../../services/alert.service';
import { DropDown,DropdownService } from '../../../../../services/builder/dropdown.service';
import { ModulesetupService } from '../../../../../services/builder/modulesetup.service';
@Component({
  selector: 'app-addmodule-setup',
  templateUrl: './addmodule-setup.component.html',
  styleUrls: ['./addmodule-setup.component.scss']
})
export class AddmoduleSetupComponent implements OnInit {
  public entryForm: FormGroup;
  submitted = false;
  basic: boolean = false;
  //fieldError: ValidationError[] = [];
  projectId: number;
  error;
  projectiddata:any={};
  tech_stacks;
  tags=[];
   isUser:boolean = true;
  constructor(private _fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private moduleSetupService: ModulesetupService,
    private alertService: AlertService,
    private dropdownService: DropdownService, private technologyStackService: TechnologyStackService,
    private toastr: ToastrService,private mainService: ProjectSetupService,) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.projectId = +params['p_id'];
    });
this.getbyprojectid(this.projectId);
    this.getAllProjects();
    this.techstackdata();
    //this.getAllModuless();


    this.entryForm = this._fb.group({
      moduleName: ['',[Validators.required]],
      tags:[null],
      description: ['',[Validators.required]],
      readme:['',[Validators.required]],
      technologyStack:['',[Validators.required]],
      modulePrefix: ['',[Validators.required]],
      dbName: ['',[Validators.required]],
      dbUserName: ['',[Validators.required]],
      dbPassword: ['',[Validators.required]],
      portNumber: ['',[Validators.required]],
      projectId:[null],
      microservice:[null],
      portaldeployment:['',[Validators.required]],
      parentrepo:['',[Validators.required]]
    });

    // copy form
    this.copyModuleForm = this._fb.group({
      from_projectId: [null],
      from_moduleId: [null],
      to_moduleName: [null]
    });
    this.getProjectModules(this.projectId);
  }
  getProjectModules(id: number) {
   // this.isLoading = true;
    this.moduleSetupService.getProjectModules(id).subscribe((data) => {
     // this.isLoading = false;
      console.log(data);
      this.modules = data.items;
      console.log(this.modules);
 //this.projectname=data.items[0]['projectName'];
 //console.log(this.projectname);
 if(data.items.length == 0){
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
  getbyprojectid(id:any){
    this.mainService.getById(id).subscribe((data)=>{
      console.log(data);
      this.projectiddata=data;
    })
  }
  techstackdata(){
    this.technologyStackService.getAll().subscribe((data)=>{
      console.log(data)
this.tech_stacks=data;
    });
  }
  onSubmit() {

    this.submitted = true;
    if (this.entryForm.invalid) {
      return;
    }
    this.onCreate();
  }

  onCreate() {
   // this.fieldError = [];
    this.entryForm.value.projectId=this.projectId;
    console.log(this.entryForm.value);
    let tagArray = JSON.stringify(this.entryForm.value.tags);
      this.entryForm.value.tags = tagArray
    this.moduleSetupService.create(this.entryForm.value).subscribe(
      (data) => {
        console.log(data);
        if (data) {
          this.toastr.success('Added successfully');
       }
       if(data.operationMessage=='Your Access is Denied Plz contact Admin'){
         this.toastr.error('Your Not Authorized To Access This Endpoint plz Contact Admin');
         }
        this.router.navigate(["../../../modules"], { relativeTo: this.route, queryParams: { p_id: this.projectId } });
        //this.router.navigate(["../all"],{ relativeTo: this.route, queryParams: { p_id: this.projectId } });
      },
      (error) => {
        console.log(error);
        const objectArray = Object.entries(error.error.fieldErrors);
        objectArray.forEach(([k, v]) => {
          console.log(k);
          console.log(v);
          if(error){
            this.toastr.error('Not Added Data Getting Some Error');
          }
         // this.fieldError.push({ field: k, message: v });
        });

        //console.log(this.fieldError); // this will come from backend
      }
    );
  }

    // need modification
    projects: DropDown[];
    getAllProjects() {
      this.dropdownService.getProjects().subscribe(res => {
        console.log('project list ', res);
        this.projects = res;
      }, (err) => {
        console.log(err);
      });
    }

    // need modification
    modules: DropDown[];
    /* getAllModuless() {
      this.dropdownService.getModules().subscribe(res => {
        console.log('module list ', res);
        this.modules = res;
      }, (err) => {
        console.log(err);
      });
    } */
    changeModule(id: number) {
      console.log('project id : ', id);
      this.dropdownService.getProjectModuleList(id).subscribe(res => {
        console.log('module list ', res);
        this.modules = res;
      }, (err) => {
        console.log(err);
      });
    }





   // copy wireframe
   copyModuleForm: FormGroup;
   coppied = false;
   copyModule() {
     console.log(this.copyModuleForm.value);
     this.coppied = true;
     if (this.copyModuleForm.invalid) {
       return;
     }
     this.moduleSetupService.copy(this.copyModuleForm.value).subscribe(data => {
       console.log(data);
       //this.alertService
       this.router.navigate(["../all"],{ relativeTo: this.route, queryParams: { p_id: this.projectId } });
     }, (err) => {
       console.log(err);
       //this.alertService
     });
   }
   onCheckChange(val){
  this.entryForm.value.microservice!=val;
//this.entryForm.value.microservice=false;

   }
}
