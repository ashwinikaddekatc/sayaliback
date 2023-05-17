import { Component, OnInit, ViewChild } from '@angular/core';
import { FileData } from 'src/app/models/builder/FileData';
import {SureopsService} from '../../../../services/builder/sureops.service';
import { CodemirrorComponent } from '@ctrl/ngx-codemirror';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-fileeditor',
  templateUrl: './fileeditor.component.html',
  styleUrls: ['./fileeditor.component.scss']
})
export class FileeditorComponent implements OnInit {
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
fileList;
id;
fileData:any;
//fileData: FileData = {} as FileData;
show;
  constructor(private sureservice:SureopsService,
    private route:ActivatedRoute,
    private toastr:ToastrService,) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = +params['id'];
      console.log(" ID ",this.id);
    });

    this.sureservice.getbyfileeid(this.id).subscribe((data)=>{
      console.log(data);
      this.fileData = data;
      //  this.show = JSON.parse(this.fileData.text) ;
      //  console.log(this.show)
    })
    //this.getall();
  }
//   getall(){
// this.sureservice.getallfiles().subscribe((data)=>{
//   console.log(data);
//   this.fileList=data;
// })
//   }
  saveTextIntoFile(){
    //  this.show = JSON.parse(this.fileData.text) ;
    //    console.log(this.show)
this.sureservice.updatebyid(this.id,this.fileData).subscribe((data)=>{
  console.log(data);
  if (data) {
    this.toastr.success('Updated sucessfully');
  }
})
  }
  setEditorContent(event){

  }
  readFile(event){
    console.log(event.target.value);
    let id = event.target.value;
this.sureservice.getbyfileid(id).subscribe((data)=>{
  console.log(data);
  this.fileData = data;
})
  }
  selectthem(event){
    console.log(event.target.value);
let the=event.target.value;
console.log(this.codeMirrorOptions.theme.value)
this.codeMirrorOptions.theme.value=event.target.value;
this.codeMirrorOptions.theme.value.setOption('theme', event.target.value);
  }

}
