import { Component, OnInit } from '@angular/core';
import { FormGroup , FormArray, FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectSetupService } from 'src/app/services/builder/project-setup.service';
import {UserstoryService  } from 'src/app/services/sureboard/userstory.service';
@Component({
  selector: 'app-edit-userstory',
  templateUrl: './edit-userstory.component.html',
  styleUrls: ['./edit-userstory.component.scss']
})
export class EditUserstoryComponent implements OnInit {
  public entryForm: FormGroup;
  selectedFile: File[]=[];
  project;
  id:number;
  editdata:any={};
  editdata1;
  repo;
  milestone;
  iteration;
  goal;
  report;
  team;
  asign;
  requestor;
  owner;
  type;
  arrayTag;

  constructor(private _fb: FormBuilder,
    private route:ActivatedRoute,
    private router: Router,
    private userservice: UserstoryService,
    private toastr:ToastrService,
    private projectSetupService: ProjectSetupService,) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    console.log("update with id = ", this.id);
    this.getById(this.id);

    this.entryForm = this._fb.group({
      name:[null] ,
      priority:[null],
      description:[null] ,
      based_on_version:[null],
      affects_version:[null],
      tags:[null],
      project:[null],
      repository:[null],
      milestone:[null],
      iteration:[null],
      goal:[null],
      team:[null],
      assignee:[null],
      report_to:[null],
      requestor:[null],
      owner:[null],
      type:[null],
      start_time:[null],
      end_time:[null],
      time_estimates_in_hrs:[null],

      Pm_Goal_Upload: this._fb.array([this.initLinesForm()]),
      });
      this.getData();
      this.getmildata();
      this.getiteradata();
      this.getgoaldata();
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
  getById(id:number){
    this.userservice.getById(id).subscribe((data)=>{
      this.editdata=data;
      console.log(this.editdata);
      this.editdata1=data.pm_User_Uploads;
      this.arrayTag = JSON.parse(data.tags);
      console.log("array tag data ",this.arrayTag);
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
    return (this.entryForm.get("Pm_Goal_Upload") as FormArray).controls;
  }
  onAddLines() {
    (<FormArray>this.entryForm.get("Pm_Goal_Upload")).push(this.initLinesForm());
    this.editdata1.push({
      attachmentId:'',
      attachmentFilename:''
    })
  }
  onRemoveLines(index: number) {
    (<FormArray>this.entryForm.get("Pm_Goal_Upload")).removeAt(index);
    this.editdata1.splice(index,1);
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
    this.router.navigate(["../user-story"], { relativeTo: this.route });
  }
  onupdate(id:any){
    this.editdata.tags = JSON.stringify(this.arrayTag);
    console.log(this.editdata.tags);
    this.userservice.update(id,this.editdata,this.selectedFile).subscribe((data)=>{
      console.log(data);
      this.router.navigate(["../../user-story"], { relativeTo: this.route })
  if (data.body) {
    this.toastr.success('Updated successfully');
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
