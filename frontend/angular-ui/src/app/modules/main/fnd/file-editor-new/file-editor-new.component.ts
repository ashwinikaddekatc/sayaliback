import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileData } from 'src/app/models/builder/FileData';
import { CodeExtractionService } from 'src/app/services/fnd/code-extraction.service';

@Component({
  selector: 'app-file-editor-new',
  templateUrl: './file-editor-new.component.html',
  styleUrls: ['./file-editor-new.component.scss']
})
export class FileEditorNewComponent implements OnInit {

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
  fileData: FileData = {} as FileData;
  header_id: number;
  id: number;
  constructor( private codeExtractionService: CodeExtractionService,
    private route: ActivatedRoute) { }

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
    this.codeExtractionService.readFile(this.id).subscribe(
      (res) => {
        console.log(res);
        //this.fileData = new FileData();
        this.fileData = res;
        //this.code = this.fileData.text;
      },
      (err) => {
        console.log(err);
      }
    );
    //this.fileData = new FileData();
  }

  saveTextIntoFile() {
    this.codeExtractionService.saveCodeIntoFile(this.fileData).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
