import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FileData } from 'src/app/models/builder/FileData';
import { Bcf_Exception_Rule_Library } from 'src/app/models/fnd/Bcf_Exception_Rule_Library ';
import { CodeExtractionService } from 'src/app/services/fnd/code-extraction.service';
import { RuleLibraryService } from 'src/app/services/fnd/rule-library.service';

@Component({
  selector: 'app-file-editor1',
  templateUrl: './file-editor1.component.html',
  styleUrls: ['./file-editor1.component.scss']
})
export class FileEditor1Component implements OnInit {

  @ViewChild('textbox', { static: false}) textAreaRef: ElementRef<HTMLTextAreaElement>;


  codeMirrorOptions: any = {
    theme: "lint",
    mode: "text/x-java",
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
  headerId: number;
  fileList: FileList[]; // for dropdown
  //fileData: FileData = new FileData();
  fileData: FileData = {} as FileData;
  code: string = '';
  ruleLibrary: Bcf_Exception_Rule_Library[];
  selectedfileid;
  constructor(private router: Router,private toastr: ToastrService,
    private route: ActivatedRoute, private ruleLibraryService: RuleLibraryService,
    private codeExtractionService: CodeExtractionService) { }

  ngOnInit(): void {
    this.code = "// edit your code here";

    this.route.queryParams.subscribe((params) => {
      this.headerId = +params["header_id"];
    });
    this.getFileListDropDownData(this.headerId);
    this.getData();
  }
  getFileListDropDownData(id: number) {
    this.codeExtractionService.getFileList(id).subscribe(
      (data) => {
        console.log(data);
        this.fileList = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  readFile(event) {
    console.log(event.target.value);
    let id = event.target.value;
    this.selectedfileid=id;
    //this.codeExtractionService.readFile(id).subscribe(
    this.codeExtractionService.readStaticFile(id).subscribe(
      (res) => {
        console.log(res);
        //this.fileData = new FileData();
        this.fileData = res;
        //this.code = this.fileData.text;
      },
      (err=HttpErrorResponse) => {
        console.log(err);
        if(err.status==417){
          this.toastr.error("This id not build master first build then show you file")
        }
      }
    );
    //this.fileData = new FileData();
  }
  getData() {
    //this.isLoading = true;
    this.ruleLibraryService.getAll().subscribe((data) => {
      //this.isLoading = false;
      console.log(data);
      //console.log(data.items);
      this.ruleLibrary = data;
      //this.rows = this.ruleLibrary;
     // this.temp = [...this.ruleLibrary];
    });
  }
  selectedkeyword;
  keyword(event){
    console.log(event.target.value);
    let key = event.target.value;
    this.selectedkeyword=event.target.value;
//     this.ruleLibraryService.keyword(this.selectedfileid,key).subscribe((data)=>{
//       console.log(data);
// if(data){
//   this.toastr.success("keyword created");
// }
//     }, (error: HttpErrorResponse) => {
//       console.log(error.message);
//       if(error.status==201){
//         this.toastr.success("keyword created");
//       }
//       // if (error) {
//       //   this.toastr.error(' Not Updated successfully');
//       //       }
//     })
  }


  saveTextIntoFile() {
    //this.codeExtractionService.saveCodeIntoFile(this.fileData).subscribe(
    this.codeExtractionService.saveCodeIntoStaticFile(this.fileData).subscribe(
      (res) => {
        console.log(res);
        console.log(res.success.message);
        if(res.success.message){
this.toastr.success(res.success.message);
        }
      },
      (err) => {
        console.log(err);
      }
    );
    this.router.navigate(["../all"], { relativeTo: this.route });
  }
  selecteddata(event){
    console.log(event);
    console.log(event.target.value);
    console.log(event.target.firstElementChild.
      innerText);
  }
  selectedText = '';
  // onTextSelected(): void {
  //   const textArea = this.textAreaRef.nativeElement;
  //   this.selectedText = textArea.value.substring(textArea.selectionStart, textArea.selectionEnd);
  //   console.log(this.selectedText);
  // }
  onTextSelected(selectedText: any): void {
    this.selectedText = selectedText;
   // this.selectedText.indexOf(this.selectedText.selectionStart)
   //let val=this.selectedText.indexOf()
    console.log(this.selectedText);

  }
  selectedtext1;
  select(event){
    //console.log(event);
    this.selectedtext1=event;
    console.log(this.selectedtext1);
  }
  insertdata(){
    this.ruleLibraryService.insertfile(this.selectedfileid,this.selectedtext1,this.selectedkeyword).subscribe((data)=>{
      console.log(data);
      this.toastr.success(data.success.message);
    }, (err:HttpErrorResponse) => {
      console.log(err);
      //this.toastr.error(err.success.message);
      if(err.status==200){
        this.toastr.success("Data inserted successfully");
      }
    })
  }
}
