import { Component, OnInit } from '@angular/core';
import { ValidationError } from 'src/app/models/fnd/ValidationError';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { ColumnSetupService } from 'src/app/services/fnd/column-setup.service';
import { StdParamSetupService } from 'src/app/services/fnd/std-param-setup.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnList } from 'src/app/models/builder/ColumnList';
import { DropDown } from 'src/app/services/builder/dropdown.service';
declare const jQuery: any;
import * as $ from 'jquery';
@Component({
  selector: 'app-rb-std-param',
  templateUrl: './rb-std-param.component.html',
  styleUrls: ['./rb-std-param.component.scss']
})
export class RbStdParamComponent implements OnInit {
  public entryForm: FormGroup;
  submitted = false;
  basic: boolean = false;
  fieldErrors: ValidationError[] = [];
  report_id: number;
  constructor(private _fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private stdParamSetupService: StdParamSetupService,
    private columnSetupService:ColumnSetupService) { }

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
      col_table_alies_name_std_para: [null],
      col_std_para_query: [null],
      field_type: [null],
     // sp_for_dd:[null],
    });
  }

  columnList: ColumnList[];
  tableAliasName() {
    this.columnSetupService.gettableAlias(this.report_id).subscribe(data => {
      console.log(data);
      this.columnList = data;
    })
  }
  get controls() {
    return (this.entryForm.get("components") as FormArray).controls;
  }

  onAddLines() {
    console.log("under add line");

    (<FormArray>this.entryForm.get("components")).push(this.initLinesForm());
  }

  onRemoveLines(index: number) {
    (<FormArray>this.entryForm.get("components")).removeAt(index);
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
    //this.fieldErrors = [];
    console.log("table name:",this.entryForm.value.components);

    this.stdParamSetupService.create(this.entryForm.getRawValue()['components'],this.report_id).subscribe(
      (data) => {
        console.log(data);

       this.router.navigate(["../query-param"], { relativeTo: this.route,queryParams: { report_id: this.report_id } });
      },
      (error) => {
        console.log(error);
        const objectArray = Object.entries(error.error.fieldErrors);
        objectArray.forEach(([k, v]) => {
          console.log(k);
          console.log(v);
          this.fieldErrors.push({ field: k, message: v });
        });
        console.log(this.fieldErrors); // this will come from backend
      }
    );
  }

  columnAliasList: DropDown[];
  changeColumn(tableAlias: string) {
    console.log('Table alias name : ', tableAlias);
    this.columnSetupService.getColumnList(tableAlias).subscribe(res => {
      console.log('module list ', res);
      this.columnAliasList = res;
    }, (err) => {
      console.log(err);
    });
  }

  length : number;
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
}
