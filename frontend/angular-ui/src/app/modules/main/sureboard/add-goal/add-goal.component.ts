import { Component, OnInit } from '@angular/core';
import { FormGroup , FormArray, FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectSetupService } from 'src/app/services/builder/project-setup.service';
import { GoalServiceService } from 'src/app/services/sureboard/goal-service.service';

@Component({
  selector: 'app-add-goal',
  templateUrl: './add-goal.component.html',
  styleUrls: ['./add-goal.component.scss']
})
export class AddGoalComponent implements OnInit {

  public entryForm: FormGroup;
  selectedFile: File[]=[];
  project;
  repo;
  milestone;
  iteration;
  report;
  team;
  asign;
  requestor;
  owner;
  type;
  tags=[];
  constructor(private _fb: FormBuilder,
    private route:ActivatedRoute,
    private router: Router,
    private goalservice: GoalServiceService,
    private toastr:ToastrService,
    private projectSetupService: ProjectSetupService,) { }

  ngOnInit(): void {
    this.entryForm = this._fb.group({
      name:[null] ,
      priority:[null],
      description:[null] ,
      based_on_version:[null],
      affects_version:[null],
      tags:[null],
      status:[null],
      project:[null],
      repository:[null],
      milestone:[null],
      iteration:[null],
      team:[null],
      assignee:[null],
      report_to:[null],
      requestor:[null],
      owner:[null],
      type:[null],
      start_time:[null],
      end_time:[null],
      time_estimates_in_hrs:[null],

      pm_Goal_Upload: this._fb.array([this.initLinesForm()]),
      });
      this.getData();
      this.getmildata();
      this.getiteradata();
      this.getteamdata();
      this.getreportdata();
      this.getrequestor();
      this.getownerdata();
      this.getasigndata();
      this.gettypedata();
  }
  getData() {
    this.projectSetupService.getprojectname().subscribe((data) => {
      console.log(data);
      this.project = data;
      //this.project = data.items;
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
  getteamdata(){
    this.projectSetupService.getallteam().subscribe((data)=>{
      this.team=data;
      console.log(this.team);
    })
  }
  getreportdata(){
    this.projectSetupService.getallreport().subscribe((data)=>{
      this.report=data;
      console.log(this.report);
    })
  }
  getasigndata(){
    this.projectSetupService.getallassign().subscribe((data)=>{
      this.asign=data;
      console.log(this.asign)
    })
  }
  getrequestor(){
    this.projectSetupService.getallrequestor().subscribe((data)=>{
      this.requestor=data;
      console.log(this.requestor);
    })
  }
  getownerdata(){
    this.projectSetupService.getallowner().subscribe((data)=>{
     this.owner=data;
      console.log(this.owner);
    })
  }
  gettypedata(){
    this.projectSetupService.getalltype().subscribe((data)=>{
     this.type=data;
      console.log(this.type);
    })
  }
  initLinesForm()
  {
    return this._fb.group({
      attachmentFilename:[null],
      attachmentId: [null],


    })
  }
  get controls(){
    return (this.entryForm.get("pm_Goal_Upload") as FormArray).controls;
  }
  onAddLines() {
    (<FormArray>this.entryForm.get("pm_Goal_Upload")).push(this.initLinesForm());
  }
  onRemoveLines(index: number) {
    (<FormArray>this.entryForm.get("pm_Goal_Upload")).removeAt(index);
  }
  public onFileChanged(event) {
    //Select File
    //this.selectedFile = event.target.files[0];
    for (var i = 0; i < event.target.files.length; i++) {
      // var name = event.target.files[i].name;
      // var type = event.target.files[i].type;
      // var size = event.target.files[i].size;
      // var modifiedDate = event.target.files[i].lastModifiedDate;
      this.selectedFile.push(event.target.files[i]);
    }
  }
  goBack() {
    this.router.navigate(["../goal"], { relativeTo: this.route });
  }
  onSubmit() {
    console.log("in oncreate method");
    let tagArray = JSON.stringify(this.entryForm.value.tags);
      this.entryForm.value.tags = tagArray
    this.goalservice.create(this.entryForm.value,this.selectedFile).subscribe((data)=>{
        console.log(data);
        this.router.navigate(["../goal"], { relativeTo: this.route })
        if (data.body) {
          this.toastr.success('Added successfully');
        }
        if(data.operationMessage=='Your Access is Denied Plz contact Admin'){
          this.toastr.error('Your Access is Denied Plz contact Admin');
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
