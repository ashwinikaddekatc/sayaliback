import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from 'src/app/services/excel.service';
import * as moment from 'moment';
import { CtemplateService } from 'src/app/services/fnd/ctemplate.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-ctemplate',
  templateUrl: './ctemplate.component.html',
  styleUrls: ['./ctemplate.component.scss']
})
export class CtemplateComponent implements OnInit {
  name = 'Edit Here';
  config = {
   uiColor: '#ffffff',
   toolbarGroups: [{ name: 'clipboard', groups: ['clipboard', 'undo'] },
   { name: 'editing', groups: ['find', 'selection', 'spellchecker'] },
   { name: 'links' }, { name: 'insert' },
   { name: 'document', groups: ['mode', 'document', 'doctools'] },
   { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
   { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align'] },
   { name: 'styles' },
   { name: 'colors' }],
   skin: 'kama',
   resize_enabled: false,
   removePlugins: 'elementspath,save,magicline',
   extraPlugins: 'divarea,smiley,justify,indentblock,colordialog',
   colorButton_foreStyle: {
      element: 'font',
      attributes: { 'color': '#(color)' }
   },
   height: 188,
   removeDialogTabs: 'image:advanced;link:advanced',
   removeButtons: 'Subscript,Superscript,Anchor,Source,Table',
   format_tags: 'p;h1;h2;h3;pre;div'
}
  loading = false;
  error;
  selected: any[] = [];
  rowSelected :any= {};
  modaldelete=false;
  modaladd=false;
  modaledit=false;
  data;
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
  submitted = false;
fileData:any;
  public entryForm: FormGroup;
  constructor(private router: Router, private toastr: ToastrService,private _fb: FormBuilder,
    private route: ActivatedRoute,private excel: ExcelService,private temservice:CtemplateService) { }

  ngOnInit(): void {
    this.getall();
    this.entryForm = this._fb.group({
      temp_name:['',[Validators.required]],
      subject:['',[Validators.required]] ,
      body:[null] ,

       });
  }
  getall(){
    this.temservice.getAll().subscribe((data)=>{
      console.log(data);
      this.data=data;
      if(this.data.lenght==0){
        this.error="No data Available"
      }
    },(error) => {
      console.log(error);
      if(error){
       this.error="No data Available OR server Error";
     }
    })
  }
  onSubmit(){
    this.submitted = true;
    if (this.entryForm.invalid) {
      return;
    }
    console.log(this.entryForm.value);
    this.temservice.create(this.entryForm.value).subscribe((data)=>{
      console.log(data);
      if (data) {
        this.toastr.success('Added successfully');
            }
    },
    (error) => {
    console.log('Error in adding data...',+error);
    if(error){
      this.toastr.error('Not added Data Getting Some Error');
    }

    });
    this.modaladd=false;
  }
  goToAdd(){
    this.modaladd=true;

  }

  onExport() {
    this.excel.exportAsExcelFile(this.data, 'user_',
      moment().format('YYYYMMDD_HHmmss'))
  }

  goToEdit(row) {
    this.rowSelected = row;
    console.log(row)
    this.modaledit=true;
  }
  onDelete(row) {
    this.rowSelected = row;
    this.modaldelete=true;
  }

  delete(id)
  {
    this.modaldelete = false;
    console.log("in delete  "+id);
    this.temservice.delete(id).subscribe((data)=>{
      console.log(data);
      if (data) {
        this.toastr.success('Deleted successfully');
            }
    },
    (error) => {
      console.log('Error in adding data...',+error);
      if(error){
        this.toastr.error('Not Deleted Data Getting Some Error');
      }
    });

  }
  onUpdate(id){
    this.modaledit=false;
this.temservice.update(id,this.rowSelected).subscribe((data)=>{
console.log(data);
if (data) {
  this.toastr.success('Updated successfully');
      }
},
(error) => {
console.log('Error in adding data...',+error);
if(error){
  this.toastr.error('Not updated Data Getting Some Error');
}
});
  }
}
