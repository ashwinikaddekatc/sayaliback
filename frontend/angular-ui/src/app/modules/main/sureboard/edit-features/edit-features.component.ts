import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectSetupService } from 'src/app/services/builder/project-setup.service';
import { FeaturesService } from 'src/app/services/sureboard/features.service';

@Component({
  selector: 'app-edit-features',
  templateUrl: './edit-features.component.html',
  styleUrls: ['./edit-features.component.scss']
})
export class EditFeaturesComponent implements OnInit {
  selectedFile: File[]=[];
  project;
  id:number;
  editdata:any={};
  editdata1;
  repo;
  milestone;
  iteration;
  goal;
  userst;
  arrayTag=[];
public entryForm: FormGroup;
  constructor(private _fb: FormBuilder,
    private route:ActivatedRoute,
    private router: Router,
    private featureservice: FeaturesService,
    private toastr:ToastrService,
    private projectSetupService: ProjectSetupService,) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    console.log("update with id = ", this.id);
    this.getById(this.id);

    this.entryForm = this._fb.group({
      name:[null] ,
      description:[null] ,
      tags:[null],
      project:[null],
      repository:[null],
      milestone:[null],
      iteration:[null],
      goal:[null],
      user_story:[null],


      pm_Feature_ListOfTasks: this._fb.array([this.initLinesForm()]),
      });
      this.getData();
      this.getmildata();
      this.getiteradata();
      this.getgoaldata();
      this.getuserstorydata();
  }
  getById(id:number){
    this.featureservice.getById(id).subscribe((data)=>{
      this.editdata=data;
      console.log(this.editdata);
      this.editdata1=data.pm_Feature_ListOfTasks;
      console.log(this.editdata1);
      this.arrayTag = JSON.parse(data.tags);
      console.log("array tag data ",this.arrayTag);
    })
  }
  getData() {
    this.projectSetupService.getprojectname().subscribe((data) => {
      console.log(data);
      this.project = data;
     // this.project = data.items;

    });
  }
  getmildata(){
    this.projectSetupService.getmilstonename().subscribe((data)=>{
      this.milestone=data;
      console.log(this.milestone);
    })
  }
  getiteradata(){
    this.projectSetupService.getiterationname().subscribe((data)=>{
      this.iteration=data;
      console.log(this.iteration);
    })
  }
  getgoaldata(){
    this.projectSetupService.getgoalname().subscribe((data)=>{
      this.goal=data;
      console.log(this.goal);
    })
  }
  getuserstorydata(){
    this.projectSetupService.getpmusername().subscribe((data)=>{
      this.userst=data;
      console.log(this.userst);
    })
  }
  initLinesForm()
  {
    return this._fb.group({
      no:[null],
      name: [null],


    })
  }
  get controls(){
    return (this.entryForm.get("pm_Feature_ListOfTasks") as FormArray).controls;
  }
  onAddLines() {
    (<FormArray>this.entryForm.get("pm_Feature_ListOfTasks")).push(this.initLinesForm());
    this.editdata1.push({
      id:'',
      name:''
    })
  }
  onRemoveLines(index: number) {
    (<FormArray>this.entryForm.get("pm_Feature_ListOfTasks")).removeAt(index);
    this.editdata1.splice(index,1);
  }
  goBack() {
    this.router.navigate(["../features"], { relativeTo: this.route });
  }
  onupdate(id:any){
    console.log(id);
    this.editdata.tags = JSON.stringify(this.arrayTag);
    console.log(this.editdata.tags);
    this.featureservice.update(id,this.editdata).subscribe((data)=>{
      console.log(data);
      this.router.navigate(["../../features"], { relativeTo: this.route })
        if (data.body) {
          this.toastr.success('Updated successfully');
              }
    },
    (error) => {
      console.log('Error in adding data...',+error);
        if(error){
          this.toastr.error('Not added Data Getting Some Error');
        }
    }
    )
      }
      modo(val){
        console.log(val);
        this.projectSetupService.getreponame(val).subscribe((data)=>{
          this.repo=data;
          this.repo=data.items;
          console.log(this.repo)
        })
      }
}
