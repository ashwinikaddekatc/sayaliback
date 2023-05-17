import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup , FormArray, FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TagModel } from 'ngx-chips/core/accessor';
import { ToastrService } from 'ngx-toastr';
import { ProjectSetupService } from 'src/app/services/builder/project-setup.service';
import { IterationServiceService } from 'src/app/services/sureboard/iteration-service.service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
declare var $:any;
//declare var angular: any;

@Component({
  selector: 'app-add-iteration',
  templateUrl: './add-iteration.component.html',
  styleUrls: ['./add-iteration.component.scss']
})
export class AddIterationComponent implements OnInit {

  tags = [];

  public entryForm: FormGroup;
  selectedFile: File[]=[];
  project;
  repository;
repo;
team;
report;
  constructor(private _fb: FormBuilder,
    private route:ActivatedRoute,
    private router: Router,
    private iterationservice: IterationServiceService,
    private toastr:ToastrService,
    private projectSetupService: ProjectSetupService,
    private http: HttpClient) { }

  ngOnInit(): void {

    //https://www.youtube.com/watch?v=B8oVdpN2Xf8
    // let tags = [];
    // function addTag(e){
    //     let code = (e.keyCode ? e.keyCode : e.which);
    //     if(code != 13)
    //     {
    //        return;
    //     }
    //     let tag = e.target.value.trim();
    //     if(tag.length < 1 || tags.includes(tag))
    //     {
    //         e.target.value = "";
    //         return;
    //     }
    //     let index = tags.push(tag);
    //     let tagItem = document.createElement("div");
    //     tagItem.classList.add("item");
    //     tagItem.innerHTML = `
    //         <span class="delete-btn" onClick="deleteTag(this,'${tag}')">
    //         &times;
    //         </span>

    //         <span>${tag}</span>
    //     `;
    //     console.log(tagItem);
    //     document.querySelector(".tag-input .tag-list").appendChild(tagItem);
    //     e.target.value = "";
    // }

    // function deleteTag(ref,tag)
    // {
    //     let parent = ref.parentNode.parentNode;
    //     parent.removeChild(ref.parentNode);
    //     let index = tags.indexOf(tag);
    //     tags.splice(index);
    // }

    // document.querySelector(".tag-input input").addEventListener("keyup",addTag);




    // $(function(){ // DOM ready

    //   // ::: TAGS BOX

    //   $("#tags input").on({
    //     focusout : function() {
    //       var txt = this.value.replace(/[^a-z0-9\+\-\.\#]/ig,''); // allowed characters
    //       if(txt) $("<span/>", {text:txt.toLowerCase(), insertBefore:this});
    //       this.value = "";
    //     },
    //     keyup : function(ev) {
    //       // if: comma|enter (delimit more keyCodes with | pipe)
    //       if(/(188|13)/.test(ev.which)) $(this).focusout();
    //     }
    //   });
    //   $('#tags').on('click', 'span', function() {
    //     if(confirm("Remove "+ $(this).text() +"?")) $(this).remove();
    //   });

    // });




    this.entryForm = this._fb.group({
      name:[null] ,
      category:[null],
      description:[null] ,
      status:[null],
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
  }


  getData() {
    this.projectSetupService.getprojectname().subscribe((data) => {
      console.log(data);
      this.project = data;
      //this.project = data.items;
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
  initLinesForm()
  {
    return this._fb.group({
      attachmentFilename:[null],
      attachmentId: [null],


    })
  }
  get controls(){
    return (this.entryForm.get("doc") as FormArray).controls;
  }
  onAddLines() {
    (<FormArray>this.entryForm.get("doc")).push(this.initLinesForm());
  }
  onRemoveLines(index: number) {
    (<FormArray>this.entryForm.get("doc")).removeAt(index);
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

  goBack()
  {
    this.router.navigate(["../iteration"], { relativeTo: this.route });
  }
  onSubmit()
  {
      console.log("In submit method");
     let myString = this.entryForm.value.tags;
     console.log(myString);
     JSON.stringify(this.entryForm.value.tags);
    // console.log("tag Array ",tagArray);
      console.log(this.entryForm.value.tags);
      console.log(this.entryForm.value);
      if(this.entryForm.invalid)
      {
        return;
      }
      this.onCreate()
  }

  onCreate() {
    console.log("in oncreate method");
    console.log(this.entryForm.value);
    let tagArray = JSON.stringify(this.entryForm.value.tags);
    this.entryForm.value.tags = tagArray
    console.log(this.entryForm.value);
    this.iterationservice.create(this.entryForm.value,this.selectedFile).subscribe((data)=>{
        console.log(data);
        this.router.navigate(["../iteration"], { relativeTo: this.route })
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


  // requestAutocompleteItems = (text: any): Observable<any> => {
  //   const url = `./assets/data/states.JSON?q=${text}`;
  //   return this.http.get(url).pipe(map((data: any) => {
  //     return data.states;
  //   }));
  // }

  // onAdding(tag: TagModel): Observable<TagModel> {
  //   const confirm = window.confirm('Do you really want to add this tag?');
  //   return of(tag).pipe(filter(() => confirm));
  // }

  // onRemoving(tag: any): Observable<TagModel> {
  //   const confirm = window.confirm('Do you really want to remove this tag?' +
  //   tag.name);
  //   return of(tag).pipe(filter(() => confirm));
  // }
}
