import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileDetails } from 'src/app/models/builder/FileDetails';
import { CodeExtractionService } from 'src/app/services/fnd/code-extraction.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-file-editor-builder',
  templateUrl: './file-editor-builder.component.html',
  styleUrls: ['./file-editor-builder.component.scss']
})
export class FileEditorBuilderComponent implements OnInit {
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
 
   code: string = '';
   fileData: FileDetails = {} as FileDetails;
   header_id: number;
   id: number;
  constructor( private codeExtractionService: CodeExtractionService,
    private route: ActivatedRoute,private router:Router, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.code = "// edit your code here";
    this.route.queryParams.subscribe(params => {
      this.header_id = +params['header_id'];
    });
    this.readFile();

  }

  readFile() {
    this.id = this.route.snapshot.params['id'];
    console.log("my id",this.id);
    //let id = this.route.snapshot.params['id'];
    this.codeExtractionService.readBuidlerFile(this.id).subscribe(
      (res) => {
        console.log(res);
        // this.fileData = res.text;
      },(error: HttpErrorResponse)=>{
        console.log(error);
        if(error.status===400){
          this.toastr.error(error.error);
        }
      if(error.status===200){
        // this.toastr.success(error.error.text);
        this.fileData = error.error.text;
        // window.location.reload();
      }
     });
    //this.fileData = new FileData();
  }

  saveTextIntoFile() {
    this.codeExtractionService.saveBuidlerFile(this.fileData).subscribe(
      (res) => {
        console.log(res);
      },(error: HttpErrorResponse)=>{
        console.log(error);
        if(error.status===400){
          this.toastr.error("File save Unsuccessful",error.error);
        }
        if(error.status==417){
          this.toastr.error("This id not build master first build then show you file")
        }
      if(error.status===200){
       this.toastr.success(error.error.text);
        // window.location.reload();
      }
     });
     this.router.navigate(["/cns-portal/code-extraction/builderFiles"], { relativeTo: this.route, queryParams: { header_id: this.header_id }});
  }
}
