import { Component, OnInit } from '@angular/core';
import { FormGroup , FormArray, FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectSetupService } from 'src/app/services/builder/project-setup.service';
import { MilestoneServiceService } from 'src/app/services/sureboard/milestone-service.service';

@Component({
  selector: 'app-add-milestone',
  templateUrl: './add-milestone.component.html',
  styleUrls: ['./add-milestone.component.scss']
})
export class AddMilestoneComponent implements OnInit {

  public entryForm: FormGroup;
  selectedFile: File[]=[];
  project;
  repo;
  iteration;
  team;
  report;
  tags = [];
  constructor(
    private _fb: FormBuilder,
    private route:ActivatedRoute,
    private router: Router,
    private toastr:ToastrService,
    private milstoneservice:MilestoneServiceService,
    private projectSetupService: ProjectSetupService,) { }

  ngOnInit(): void {
    this.entryForm = this._fb.group({
      name:[null] ,
     description:[null] ,
      priority:[null],
      billiable:[null],
      status:[null],
      iteration:[null],
      tags:[null],
      project:[null],
      repository:[null],
      team:[null],
      report_to:[null],
      start_time:[null],
      end_time:[null],
      time_estimates_in_hrs:[null],

      pm_milestone_Uploads: this._fb.array([this.initLinesForm()]),
      });
      this.getData();
      this.getiteradata();
      this.getteamdata();
      this.getreportdata();
  }
  getData() {
    this.projectSetupService.getprojectname().subscribe((data) => {
      console.log(data);
      this.project = data;
      //this.project = data.items;
    });
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
  initLinesForm()
  {
    return this._fb.group({
      attachmentFilename:[null],
      attachmentId: [null],


    })
  }
  get controls(){
    return (this.entryForm.get("pm_milestone_Uploads") as FormArray).controls;
  }
  onAddLines() {
    (<FormArray>this.entryForm.get("pm_milestone_Uploads")).push(this.initLinesForm());
  }
  onRemoveLines(index: number) {
    (<FormArray>this.entryForm.get("pm_milestone_Uploads")).removeAt(index);
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
  goBack(){
    this.router.navigate(["../milestone"], { relativeTo: this.route });
  }
  onSubmit()
  {

      console.log("in oncreate method");
      let tagArray = JSON.stringify(this.entryForm.value.tags);
      this.entryForm.value.tags = tagArray
      this.milstoneservice.create(this.entryForm.value,this.selectedFile).subscribe((data)=>{
          console.log(data);
          this.router.navigate(["../milestone"], { relativeTo: this.route })
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
