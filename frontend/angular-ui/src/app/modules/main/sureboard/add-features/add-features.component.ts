import { Component, OnInit } from '@angular/core';
import { FormGroup , FormArray, FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectSetupService } from 'src/app/services/builder/project-setup.service';
import { FeaturesService} from 'src/app/services/sureboard/features.service';
@Component({
  selector: 'app-add-features',
  templateUrl: './add-features.component.html',
  styleUrls: ['./add-features.component.scss']
})
export class AddFeaturesComponent implements OnInit {
  public entryForm: FormGroup;
  project;
  repo;
  milestone;
  iteration;
  goal;
  userst;
  tags=[];
  constructor(private _fb: FormBuilder,
    private route:ActivatedRoute,
    private router: Router,
    private featureservice: FeaturesService,
    private toastr:ToastrService,
    private projectSetupService: ProjectSetupService,) { }

  ngOnInit(): void {
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
      id:[null],
      name: [null],


    })
  }
  get controls(){
    return (this.entryForm.get("pm_Feature_ListOfTasks") as FormArray).controls;
  }
  onAddLines() {
    (<FormArray>this.entryForm.get("pm_Feature_ListOfTasks")).push(this.initLinesForm());
  }
  onRemoveLines(index: number) {
    (<FormArray>this.entryForm.get("pm_Feature_ListOfTasks")).removeAt(index);
  }
  goBack() {
    this.router.navigate(["../features"], { relativeTo: this.route });
  }
  onSubmit() {
    console.log("in oncreate method");
    let tagArray = JSON.stringify(this.entryForm.value.tags);
    this.entryForm.value.tags = tagArray
    this.featureservice.create(this.entryForm.value).subscribe((data)=>{
        console.log(data);
        this.router.navigate(["../features"], { relativeTo: this.route })
        if (data.body) {
          this.toastr.success('Added successfully');
              }
    },
    (error) => {
      console.log('Error in adding data...',+error);
      if(error){
        this.toastr.error('Not added Data Getting Some Error');
      }
    });

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
