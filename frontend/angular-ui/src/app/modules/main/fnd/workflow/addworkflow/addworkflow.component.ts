import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TechnologyStackService } from 'src/app/services/builder/technology-stack.service';
import { WorkflowDataService } from 'src/app/services/fnd/workflow-data.service';
@Component({
  selector: 'app-addworkflow',
  templateUrl: './addworkflow.component.html',
  styleUrls: ['./addworkflow.component.scss']
})
export class AddworkflowComponent implements OnInit {
  public entryForm:FormGroup;
  tech_stacks;
tags=[];
category=[];
  nodeField = [
    {
     "title" : "changeme",
     "type" : "Initialize",
     "id" : "1"
  }
  ];
  constructor(private _fb:FormBuilder,
    private workflowservice:WorkflowDataService,
    private toastr:ToastrService,
    private router : Router,private technologyStackService: TechnologyStackService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.entryForm = this._fb.group({
      workflow_name : [null],
      description: [null],
      tags : [null],
      app_category:[null],
      select_technology:[null],
      workflow_Lines: this._fb.array([this.initLinesForm()]),
    });
    this.techstackdata();
  }
  initLinesForm() {
    return this._fb.group({
      model: ''
      //model:JSON.stringify(this.nodeField)
    });
  }
  techstackdata(){
    this.technologyStackService.getAll().subscribe((data)=>{
      console.log(data)
this.tech_stacks=data;
    });
  }
  onSubmit()
  {
    console.log("In on submit method");
    let tagArray = JSON.stringify(this.entryForm.value.tags);
    this.entryForm.value.tags = tagArray;
    let catArray = JSON.stringify(this.entryForm.value.app_category);
    this.entryForm.value.app_category = catArray;
    console.log(this.entryForm.value);
    if (this.entryForm.invalid) {
      return;
    }
    this.onCreate();
  }

  onCreate()
  {
     console.log("IN on crate method");

     this.workflowservice.create(this.entryForm.value).subscribe((data)=>{
      console.log(data);
      this.router.navigate(["../all"],{relativeTo:this.route});
        if(data)
        {
          this.toastr.success('Added successfully');
        }
     },
     (error) => {
       console.log('Error in adding data...',+error);
         if(error){
           this.toastr.error('Data Not Added Getting Some Error');
         }
     });

  }
}
