import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Bcf_Exception_Rule_Library } from 'src/app/models/fnd/Bcf_Exception_Rule_Library ';
import { AlertService } from 'src/app/services/alert.service';
import { TechnologyStackService } from 'src/app/services/builder/technology-stack.service';
import { RuleLibraryService } from 'src/app/services/fnd/rule-library.service';
import { Rule} from 'src/app/models/fnd/RuleCopy';

@Component({
  selector: 'app-rule-libraryall',
  templateUrl: './rule-libraryall.component.html',
  styleUrls: ['./rule-libraryall.component.scss']
})
export class RuleLibraryallComponent implements OnInit {

  @ViewChild('codemirror', { static: false}) textAreaRef: ElementRef<HTMLTextAreaElement>;

  codeMirrorOptions: any = {
    theme: "lint",
    mode: "text/x-json",
    lineNumbers: true,
    cursorBlinkRate: -1,
    readOnly: true,
    //noNewlines: true,
    autorefresh:true,
    lineSeparator: "\n",
    lineWrapping: true,
    // foldGutter: false,
    // gutters: [
    //   "CodeMirror-linenumbers",
    //   "CodeMirror-foldgutter",
    //   "CodeMirror-lint-markers",
    // ],
    autoCloseBrackets: true,
    extraKeys: { "Ctrl-Space": "autocomplete" },
    matchBrackets: true,
    lint: true,
  };
  
  ruleLibrary: Bcf_Exception_Rule_Library[];
  tech_stacks=[];
  loading = false;
  error;
  selected: any[] = [];
  rowSelected :any= {};
  modaldelete=false;
  ruledata;
  rsModal= false;
  copyModal = false;
  object_types = ['form', 'bi', 'report', 'api'];
  sub_object_types = ['only header', 'only line', 'header line', 'header multiline', 'wrokflow', 'setup', 'std report', 'bi report', 'rest api'];
  public copyForm:FormGroup;
  rule: Rule = {
    tech_stack: '',
    object_type: '',
    sub_object_type: '',
    version: '',
    replacement_string: '',
    keyword: '',
    priority: 0,
    service: ''
  };

  constructor(private _fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ruleLibraryService: RuleLibraryService,
    private alertService: AlertService,private toastr: ToastrService,
    private technologyStackService:TechnologyStackService) { }

    

  ngOnInit(): void {
    this.initCopyRuleForm();

    this.getData();
    //for dynamic tech stack
    this.technologyStackService.getAll().subscribe((data)=>{
      console.log(data);
      this.tech_stacks=data;
    });
    //working
    this.copyForm = this._fb.group({
      technology_stack:[null],
      service:[null],
      object_type:[null],
      sub_object_type:[null],
      new_tech_stack_name:[null],
    });
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

  // rule copy code
  public copyRuleForm: FormGroup;
  submitted = false;
  initCopyRuleForm() {
    this.copyRuleForm = this._fb.group({
      from_tech_stack: [null],
      from_object_type: [null],
      from_sub_object_type: [null],
      to_tech_stack: [null],
      to_object_type: [null],
      to_sub_object_type: [null]
    });
  }
  onSubmit() {
    console.log(this.copyRuleForm.value);
    this.submitted = true;
    if (this.copyRuleForm.invalid) {
      return;
    }
    this.onCopy();
  }
  onCopy() {
    this.ruleLibraryService.copy(this.copyRuleForm.value).subscribe(
      (data) => {
        console.log(data);
        // alert service
        this.alertService.success('Rule Copied successfully');
        this.getData();
      },(err) => {
        console.log(err);
        this.alertService.error('Rule Copy Failed');
      }
    );
  }
  goToAdd() {
    this.router.navigate(["../add"], { relativeTo: this.route });
  }

  goToReadOnly(id: number) {
    this.router.navigate(["../readonly/" + id], { relativeTo: this.route });
  }

  goToEdit(id: number) {
    this.router.navigate(["../edit/" + id], { relativeTo: this.route });
  }
  goToReplaceString(row){
    this.rowSelected = row;
    this.rsModal =true;
  }

  // goToExceptionRule() {
  //   this.router.navigate(["/cns-portal/exception-rule-library"]);
  // }
  onDelete(row) {
    this.rowSelected = row;
     this.modaldelete=true;
  }

  delete(id)
  {
    this.modaldelete = false;
    console.log("in delete  "+id);
    this.ruleLibraryService.delete(id).subscribe(
      (data) => {
        console.log(data);
        this.ngOnInit();
        if (data) {
          this.toastr.success('Deleted successfully');
              }
      },
      (error) => {
        console.log('Error in adding data...',+error);
        if(error){
          this.toastr.error('Not Deleted Data Getting Some Error');
        }
      }
    );
  }

  goToCopy(){
    this.copyModal = true;
  }
  onCopyRule(){
    this.ruleLibraryService.copyRule(this.copyForm.value.technology_stack, this.copyForm.value.object_type, this.copyForm.value.sub_object_type, this.copyForm.value.service, this.copyForm.value.new_tech_stack_name, this.rule).subscribe((data)=> {
      console.log(data);
      this.alertService.success('Rule Copied successfully');
        this.getData();
    },(err) => {
      console.log(err);
      this.alertService.error('Rule Copy Failed');
      this.getData();
    });
    this.copyForm.reset();
    this.copyModal=false;
  }
}
