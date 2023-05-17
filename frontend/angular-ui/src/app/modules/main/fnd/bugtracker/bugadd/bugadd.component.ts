import { HttpHeaderResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectSetupService } from 'src/app/services/builder/project-setup.service';
import { BugtrackerService } from 'src/app/services/fnd/bugtracker.service';

@Component({
  selector: 'app-bugadd',
  templateUrl: './bugadd.component.html',
  styleUrls: ['./bugadd.component.scss']
})
export class BugaddComponent implements OnInit {
  public entryForm: FormGroup;
  selectedFile: File[]=[];
  projectsetup;
 er;
  constructor(private _fb: FormBuilder,private pservice:ProjectSetupService,private bugservice:BugtrackerService,
    private toastr: ToastrService,private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.entryForm = this._fb.group({
      select_project:[null] ,
     description:[null] ,
     select_priority:[null],
      type:[null],
      key_no:[null],
    assignee:[null],
    reporter:[null],
    select_status:[null],
      fileName:[null],
      title:[null],
      steps:[null],
      });
      this.getprojectdata();
  }
  getprojectdata(){

    this.pservice.getallmyproject().subscribe((data) => {
      console.log(data);
      this.projectsetup = data;

      if(data.length == 0){
        this.er="No data Available";
        console.log(this.er);
      }

    },(error) => {
      console.log(error);
      if(error){
       this.er="No data Available OR server Error";
     }
    });

}
public onFileChanged(event) {
  //Select File
  console.log(event);
  this.selectedFile = event.target.files[0];

}
onSubmit(){
  console.log(this.entryForm.value);
  console.log(this.entryForm.value);
    this.bugservice.create1(this.entryForm.value,this.selectedFile).subscribe((data)=>{
      console.log(data);

    }, (error: HttpHeaderResponse)=>{
      console.log(error);
      if(error.status===202){
        this.toastr.success("Added Succesfully");
      }
      if(error.status===404){
        this.toastr.error("Not Added");
      }
    });
    this.router.navigate(["../bugall"], { relativeTo: this.route });

}
goBack(){
  this.router.navigate(["../bugall"], { relativeTo: this.route });
}
}
