import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectSetupService } from 'src/app/services/builder/project-setup.service';
import { IterationServiceService } from 'src/app/services/sureboard/iteration-service.service';

@Component({
  selector: 'app-edit-iteration',
  templateUrl: './edit-iteration.component.html',
  styleUrls: ['./edit-iteration.component.scss']
})
export class EditIterationComponent implements OnInit {
  public entryForm: FormGroup;
  selectedFile: File[]=[];
  id: number;
  editdata:any={};
  editdata1=[{
    attachmentId:'',
    attachmentFilename:''
  }]
  project;
  repo;
  report;
  team;
  constructor(private _fb: FormBuilder,
    private route:ActivatedRoute,
    private router: Router,
    private iterationservice: IterationServiceService,
    private toastr:ToastrService,
    private projectSetupService: ProjectSetupService,) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    console.log("update with id = ", this.id);
    this.getById(this.id);
    this.entryForm = this._fb.group({
      name:[null] ,
      category:[null],
      description:[null] ,
      tags:[null],
      project:[null],
      repository:[null],
      team:[null],
      report_to:[null],
      start_time:[null],
      end_time:[null],
      time_estimates_in_hrs:[null],

      doc: this._fb.array([this.initLinesForm()]),
      });
      this.getData();
      this.getteamdata();
      this.getreportdata();
//this.modo(event.target.value)

  }

  getData() {
    this.projectSetupService.getprojectname().subscribe((data) => {
      console.log(data);
      this.project = data;
      // for (let i = 0; i < data; i++){
      //   this.projectid=data[i].Ports;
      // }
      //   console.log(this.projectid);
      //this.projectid = data[].id;
    });
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
 arrayTag = [];
  getById(id:number){
    this.iterationservice.getById(id).subscribe((data)=>{
      this.arrayTag = JSON.parse(data.tags);
      //this.editdata.tags = JSON.parse(data.tags);
     // console.log(this.editdata.tags);
      //console.log(data.tags);
      this.editdata=data;
      console.log(this.editdata);
      console.log("array tag data ",this.arrayTag);
      this.editdata1=data.doc;
      console.log(this.editdata1);
    })
  }
  initLinesForm()
  {
    return this._fb.group({
      attachmentId: [null],
      attachmentFilename:[null],

    })
  }
  get controls(){
    return (this.entryForm.get("doc") as FormArray).controls;
  }
  onAddLines() {
    (<FormArray>this.entryForm.get("doc")).push(this.initLinesForm());
    this.editdata1.push({
      attachmentId:'',
      attachmentFilename:''
    })
  }
  onRemoveLines(index: number) {
    (<FormArray>this.entryForm.get("doc")).removeAt(index);
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
  goBack(){
    this.router.navigate(["../iteration"], { relativeTo: this.route });
  }
  onupdate(id:any){
    this.editdata.doc=this.editdata1;
    this.editdata.tags = JSON.stringify(this.arrayTag);
    console.log(this.editdata.tags);
    console.log(this.editdata);
this.iterationservice.update(id,this.editdata,this.selectedFile).subscribe((data)=>{
  console.log(data);
  this.router.navigate(["../../iteration"], { relativeTo: this.route })
  if (data.body) {
    this.toastr.success('Updated successfully');
  }
  if(data.operationMessage=='Your Access is Denied Plz contact Admin'){
    this.toastr.error('Your Access is Denied Plz contact Admin');
   }
},(error) => {
  console.log('Error in adding data...',+error);
    if(error){
      this.toastr.error('Not added Data Getting Some Error');
    }
});
  }
  select(id){
console.log(id);
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
