import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { ActiveTechnology } from "../../../../../models/builder/ActiveTechnology";
//import { ValidationError } from '../../../../models/ValidationError';
import {DropDown, DropdownService } from "../../../../../services/builder/dropdown.service";
import { ProjectSetupService } from "../../../../../services/builder/project-setup.service";
import { TechnologyStackService } from "../../../../../services/builder/technology-stack.service";
import { HttpHeaderResponse } from '@angular/common/http';
@Component({
  selector: 'app-addprojectsetup',
  templateUrl: './addprojectsetup.component.html',
  styleUrls: ['./addprojectsetup.component.scss']
})
export class AddprojectsetupComponent implements OnInit {
  public entryForm: FormGroup;
  public boardForm:FormGroup;
  submitted = false;
  basic: boolean = false;
  //errorFields: ValidationError[] = [];
  tech_stacks = [];
  tags=[];
  access=[];
  constructor(private _fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private projectSetupService: ProjectSetupService,
    private technologyStackService: TechnologyStackService,
    private dropdownService: DropdownService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.getAllProjects();

    this.activeTechnologyDropdown();

   this.entryForm = this._fb.group({
     projectName:['', [Validators.required, this.noWhitespaceValidator, this.nounderscoreValidator]],
     description: ['',[Validators.required]],
     technologyStack: ['',[Validators.required]],
    // techStackId: [null],
     projectPrefix: ['',[Validators.required]],
     dbName: ['',[Validators.required]],
     dbUserName: ['',[Validators.required]],
     dbPassword: [null],
     portNumber: ['3306'],
     namespace: [null],
     tags:[null],
     category:[null],
    accessibility:[null]
   });

    // copy form
    this.copyProjectForm = this._fb.group({
     from_projectId: [null],
     to_projectName: [null],
     to_tech_stack: [null]
   })
    // for dynamic tech stack
    this.technologyStackService.getAll().subscribe((data)=>{
      console.log(data)
this.tech_stacks=data;
      // for(let ts of data.items)
      // {
      //   if(ts.tech_stack==null)
      //   {
      //     return;
      //   }
      //   console.warn(ts.tech_stack);

      //   this.tech_stacks.push(ts.tech_stack)

      // }

    });
    //add board form
this.boardForm = this._fb.group({
  bName:['Board1'] ,
  type:['project'] ,
  project_id:[null] ,
    });
  }
  noWhitespaceValidator(control: FormControl) {
    const isSpace = (control.value || '').match(/\s/g);
    return isSpace ? {'whitespace': true} : null;
}
nounderscoreValidator(control: FormControl) {
  const isunder = (control.value || '').match(/[\W_]+/);
  return isunder ? {'under': true} : null;
}
  onSubmit() {
    console.log(this.entryForm.value);
    this.submitted = true;
    if (this.entryForm.invalid) {
      return;
    }
    this.onCreate();
  }
// add project temporrary commit

  onCreate() {
    //this.errorFields = [];
    let tagArray = JSON.stringify(this.entryForm.value.tags);
      this.entryForm.value.tags = tagArray
      console.log("tag",this.entryForm.value.tags);
      let cat=JSON.stringify(this.entryForm.value.category);
      this.entryForm.value.category= cat
      this.entryForm.value.accessibility=this.setvalue;
    this.projectSetupService.create(this.entryForm.value).subscribe(
      (data) => {
        console.log(data);
       this.router.navigate(["../../project/all"], { relativeTo: this.route });
       if(data.operationMessage=='Your Access is Denied Plz contact Admin'){
        this.toastr.error('Your Not Authorized To Access This Endpoint plz Contact Admin');
       }
       if (data.body) {
        this.toastr.success('Added successfully');
            }
      }, (error: HttpHeaderResponse)=>{
        console.log(error);
        if(error.status===201){
          this.toastr.success("Added Succesfully");
          this.router.navigate(["../../project/all"], { relativeTo: this.route });
        }
        if(error.status===200){
          this.toastr.success("Added Succesfully");
          this.router.navigate(["../../project/all"], { relativeTo: this.route });
        }
        if(error.status===500){
          this.toastr.error("getting error in project creation");
        }
        if(error.status===400){
          this.toastr.error("Not Added");
        }
      });

  }
goback(){
  this.router.navigate(["../../project/all"], { relativeTo: this.route });
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


  activeTechnologyDropDown: ActiveTechnology[];
   activeTechnologyDropdown() {
     this.technologyStackService.getActiveTechnology().subscribe(data => {
      console.log(data);
      this.activeTechnologyDropDown = data;
     })
   }

   // copy project
   copyProjectForm: FormGroup;
   coppied = false;
   copyProject() {
     console.log(this.copyProjectForm.value);
     this.coppied = true;
     if (this.copyProjectForm.invalid) {
       console.log("this form is invalid custome comment");

       return;
     }
     this.projectSetupService.copy(this.copyProjectForm.value).subscribe(data => {
       //console.log("ganesh bute data",data);
       this.router.navigate(["../../project1"],{ relativeTo: this.route });
     }, (err) => {
       console.log("in error page");

       console.log(err);
     });
   }
   setvalue;
   changeGender(e) {
    console.log(e.target.value);
    this.setvalue=e.target.value;
    console.log(this.setvalue);
  }
}
