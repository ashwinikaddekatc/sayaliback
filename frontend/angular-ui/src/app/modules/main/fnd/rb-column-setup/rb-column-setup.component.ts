import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { ValidationError } from 'src/app/models/fnd/ValidationError';
import { Router, ActivatedRoute } from '@angular/router';
import { ColumnSetupService } from 'src/app/services/fnd/column-setup.service';
import { TableList } from 'src/app/models/fnd/TableList';
import { DropDown } from 'src/app/services/builder/dropdown.service';
declare const jQuery: any;
import * as $ from 'jquery';
@Component({
  selector: 'app-rb-column-setup',
  templateUrl: './rb-column-setup.component.html',
  styleUrls: ['./rb-column-setup.component.scss']
})
export class RbColumnSetupComponent implements OnInit {
  public entryForm: FormGroup;
  submitted = false;
  basic: boolean = false;
  fieldErrors: ValidationError[] = [];
  report_id: number;
  functions = [
    "ASCIISTR",
    "INITCAP",
    "LENGTH",
    "LENGTH2",
    "LENGTH4",
    "LENGTHB",
    "LENGTHC",
    "LOWER",
    "SOUNDEX",
    "UPPER",
    "VSIZE",
    "ABS",
    "ACOS",
    "ASIN",
    "ATAN",
    "AVG",
    "CEIL",
    "COS",
    "COSH",
    "COUNT",
    "EXP",
    "FLOOR",
    "LN",
    "MAX",
    "MEDIAN",
    "MIN",
    "ROWNUM",
    "SIGN",
    "SIN",
    "SQRT",
    "SUM",
    "TAN",
    "TANH",
    "CURRENT_DATE",
    "CURRENT_TIMESTAMP",
    "DBTIMEZONE",
    "LOCALTIMESTAMP",
    "SESSIONTIMEZONE",
    "SYSDATE",
    "SYSTIMESTAMP",
    "BIN_TO_NUM",
    "TO_CLOB",
    "TO_LOB",
    "TO_MULTI_BYTE",
    "TO_NCLOB",
    "TO_NUMBER",
    "TO_SINGLE_BYTE",
    "TO_YMINTERVAL",
    "VAR_POP",
    "VAR_SAMP",
    "VARIANCE",
    "UID",
    "USER"
  ];
  constructor(private _fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private columnSetupService: ColumnSetupService,) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.report_id = +params['report_id'];
    });
    this.tableAliasName();
    this.entryForm = this._fb.group({
      components: this._fb.array([this.initLinesForm()]),
    });
  }
  initLinesForm() {
    return this._fb.group({
      table_allies_name: [null],
      functions: [null],
      column_name: [null],
      column_allias_name: [null],
      asc_desc: [null],
    });
  }



  get controls() {
    return (this.entryForm.get("components") as FormArray).controls;
  }

  onAddLines() {
    console.log("under add line");

    (<FormArray>this.entryForm.get("components")).push(this.initLinesForm());
  }

  tableList: TableList[];
  tableAliasName() {
    this.columnSetupService.gettableAlias(this.report_id).subscribe(data => {
      console.log(data);
      this.tableList = data;
    })
  }

  onSubmit() {
    console.log(this.entryForm.value);
    this.submitted = true;
    if (this.entryForm.invalid) {
      return;
    }
    this.onCreate();
  }

  onCreate() {
    this.columnSetupService.create(this.entryForm.getRawValue()['components'],this.report_id).subscribe(
      (data) => {
        console.log(data);
          this.router.navigate(["../where-param"], { relativeTo: this.route,queryParams: { report_id: this.report_id } });
      },
      (error) => {
        console.log(error);
        // const objectArray = Object.entries(error.error.fieldErrors);
        // objectArray.forEach(([k, v]) => {
        //   console.log(k);
        //   console.log(v);
        //  // this.fieldErrors.push({ field: k, message: v });
        // });
       // console.log(this.fieldErrors); // this will come from backend
      }
    );
  }
  length : number;
  columnList: DropDown[];
  changeColumn(tableAlias: string) {
    console.log('Table alias name : ', tableAlias);
    this.length=this.controls.length-1;
    this.columnSetupService.getColumnList(tableAlias).subscribe(res => {
      console.log('module list ', res);
      this.columnList= res;
    }, (err) => {
      console.log(err);
    });
  }

  length1 : number;
  changeColumnAlias(name:string)
    {
      console.log("values ",name);
      console.log("length before value::",this.controls.length);
      this.length=this.controls.length-1;
      this.length1=this.length+1;
      name = name.substring(name.indexOf(".") + 1);
      console.log("length value::",this.length-1);
      $("input#column_allias_name"+this.length).val(name+"_"+this.length1);

    }
    onRemoveLines(i){

    }
}
