import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ValidationError } from 'src/app/models/fnd/ValidationError';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnList } from 'src/app/models/builder/ColumnList';
import { WhereParamSetupService } from 'src/app/services/fnd/where-param-setup.service';
import { ColumnSetupService } from 'src/app/services/fnd/column-setup.service';
import { DropDown } from 'src/app/services/builder/dropdown.service';
@Component({
  selector: 'app-rb-where-column-setup',
  templateUrl: './rb-where-column-setup.component.html',
  styleUrls: ['./rb-where-column-setup.component.scss']
})
export class RbWhereColumnSetupComponent implements OnInit {
  public entryForm: FormGroup;
  submitted = false;
  basic: boolean = false;
  fieldErrors: ValidationError[] = [];
  report_id: number;
  conditions = ["EQUAL",
      "NOT EQUAL",
      "GREATER THAN",
      "LESS THAN",
      "GREATER THAN OR EQUAL",
      "LESS THAN OR EQUAL",
      "BETWEEN",
      "IN",
      "LIKE"];
  constructor(private _fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private whereParamSetupService: WhereParamSetupService,
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
      explecity: [null],
      where_coloumn1_tbl_alias_name: [null],
      where_coloumn: [null],
      where_condition: [null],
      switch_control: [null],
      where_coloumn2_tbl_alias_name: [null],
      where_coloumn2: [null],
    });
  }

  get controls() {
    return (this.entryForm.get("components") as FormArray).controls;
  }

  onAddLines() {
    console.log("under add line");

    (<FormArray>this.entryForm.get("components")).push(this.initLinesForm());
  }

  columnList: ColumnList[];
  tableAliasName() {
    this.columnSetupService.gettableAlias(this.report_id).subscribe(data => {
      console.log(data);
      this.columnList = data;
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
    //this.fieldErrors = [];
    console.log("table name:",this.entryForm.value.components);

    this.whereParamSetupService.create(this.entryForm.getRawValue()['components'],this.report_id).subscribe(
      (data) => {
        console.log(data);
        console.log("Where Id:",data.where_condition);

       this.router.navigate(["../date-param"], { relativeTo: this.route,queryParams: { report_id: this.report_id } });
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

  columnList1: DropDown[];
  changeColumn(tableAlias: string) {
    console.log('Table alias name : ', tableAlias);
    this.columnSetupService.getColumnList(tableAlias).subscribe(res => {
      console.log('module list ', res);
      this.columnList1 = res;
    }, (err) => {
      console.log(err);
    });
  }

  columnList2: DropDown[];
  changeColumn2(tableAlias: string) {
    console.log('Table alias name : ', tableAlias);
    this.columnSetupService.getColumnList(tableAlias).subscribe(res => {
      console.log('module list ', res);
      this.columnList2 = res;
    }, (err) => {
      console.log(err);
    });
  }
  onRemoveLines(i){}
}
