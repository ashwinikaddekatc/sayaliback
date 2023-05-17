import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CodemirrorComponent } from '@ctrl/ngx-codemirror';
import { ToastrService } from 'ngx-toastr';
import { SchedulerService } from 'src/app/services/fnd/scheduler.service';

@Component({
  selector: 'app-schedulerlogreadfile',
  templateUrl: './schedulerlogreadfile.component.html',
  styleUrls: ['./schedulerlogreadfile.component.scss']
})
export class SchedulerlogreadfileComponent implements OnInit {
  @ViewChild('codeEditor') codeEditor: CodemirrorComponent;
  codeMirrorOptions: any = {
    theme: "lint",
    mode:"text/x-java",
    lineNumbers: true,
    //noNewlines: true,
    lineSeparator: "\n",
    lineWrapping: true,
    foldGutter: true,
    gutters: [
      "CodeMirror-linenumbers",
      "CodeMirror-foldgutter",
      "CodeMirror-lint-markers",
    ],
    autoCloseBrackets: true,
    extraKeys: { "Ctrl-Space": "autocomplete" },
    matchBrackets: true,
    lint: true,
  };
  id:any;
  fileData:any={};
  constructor(private route:ActivatedRoute, private mainservice:SchedulerService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = +params['id'];
      console.log(" ID ",this.id);
    });
    this.mainservice.readlogfile(this.id).subscribe((data)=>{
      console.log(data);
      this.fileData = data;

    },(error:HttpErrorResponse) => {
      console.log(error);
      if(error.status==200){
       this.fileData=error.error;
     }
     if(error.status==404){
      this.toastr.error(error.error);
    }

    })
  }
  saveTextIntoFile(){

  }
}
