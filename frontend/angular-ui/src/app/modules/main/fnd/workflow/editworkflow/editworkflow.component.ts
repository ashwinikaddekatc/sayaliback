import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TechnologyStackService } from 'src/app/services/builder/technology-stack.service';
import { WorkflowDataService } from 'src/app/services/fnd/workflow-data.service';
@Component({
  selector: 'app-editworkflow',
  templateUrl: './editworkflow.component.html',
  styleUrls: ['./editworkflow.component.scss']
})
export class EditworkflowComponent implements OnInit {
  data:any={};
  id;
  arrayTag = [];
categoryarray=[];
tech_stacks;
  constructor(private workflowservice:WorkflowDataService,
    private toastr:ToastrService,
    private router : Router,private technologyStackService: TechnologyStackService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    console.log("update with id = ", this.id);
    this.getById(this.id);
    this.techstackdata();
  }
  getById(id:number)
  {
      this.workflowservice.getById(id).subscribe((data)=>{
        console.log("Data By id ",data);
        this.data = data;
        this.arrayTag = JSON.parse(data.tags);
        console.log("this.arrayTag ",this.arrayTag);
        this.categoryarray=JSON.parse(data.app_category);
      },
      (error)=>{
        console.log(error);
      });
  }
  techstackdata(){
    this.technologyStackService.getAll().subscribe((data)=>{
      console.log(data)
this.tech_stacks=data;
    });
  }
  onSubmit() {
   // this.updated = true;
    this.update();
  }

  update()
  {
      console.log(this.id,this.data);
      this.data.tags = JSON.stringify(this.arrayTag);
      this.workflowservice.update(this.id,this.data).subscribe((data)=>{
        console.log(data);
        this.router.navigate(["../../all"], { relativeTo: this.route });
        if (data) {
          this.toastr.success('Updated successfully');
        }
      },
      (error) => {
        console.log('Error in adding data...',+error);
          if(error){
            this.toastr.error('Data Not Updated Getting Some Error');
          }
      });

  }
}
