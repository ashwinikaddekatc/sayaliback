import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//import { ValidationError } from 'src/app/models/ValidationError';
import { TableSetupService } from '../../../../services/api/table-setup.service';
import { TableList } from '../../../../models/fnd/table-setup';
declare const jQuery: any;
import * as $ from 'jquery';
@Component({
  selector: 'app-rb-table-setup',
  templateUrl: './rb-table-setup.component.html',
  styleUrls: ['./rb-table-setup.component.scss']
})
export class RbTableSetupComponent implements OnInit {
  public entryForm: FormGroup;
  submitted = false;
  basic: boolean = false;
  //fieldErrors: ValidationError[] = [];
  report_id: number;
  length : number;
  constructor(private _fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private setupSetupService: TableSetupService,) { }

  ngOnInit(): void {
    // this.report_id = this.route.snapshot.params["report_id"];
    this.route.queryParams.subscribe(params => {
      this.report_id = +params['report_id'];
    });
    console.log("ganesh report id:::",this.report_id)
   // hello();
    this.listofTables();
    //this.reportId=10;
    this.entryForm = this._fb.group({
      components: this._fb.array([this.initLinesForm()]),
    });

  }
  initLinesForm() {
    return this._fb.group({
      table_name: [null],
      table_allias_name: [null],
    });
  }

  get controls() {

    return (this.entryForm.get("components") as FormArray).controls;
  }

  onAddLines() {
    console.log("under add line");

    (<FormArray>this.entryForm.get("components")).push(this.initLinesForm());
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

    this.setupSetupService.create(this.entryForm.getRawValue()['components'],this.report_id).subscribe(
      (data) => {
        console.log(data);

       this.router.navigate(["../column-setup"], { relativeTo: this.route,queryParams: { report_id: this.report_id } });
      },
      (error) => {
        console.log(error);
        const objectArray = Object.entries(error.error.fieldErrors);
        objectArray.forEach(([k, v]) => {
          console.log(k);
          console.log(v);
          //this.fieldErrors.push({ field: k, message: v });
        });
        //console.log(this.fieldErrors); // this will come from backend
      }
    );
  }

  tableList: TableList[];
  listofTables() {
    this.setupSetupService.getTableList().subscribe(data => {
      console.log("table list "+data);
      this.tableList = data;
    })
  }

    changeAlias(name:string)
    {
      console.log("values ",name);
      console.log("length before value::",this.controls.length);
      this.length=this.controls.length-1;
      console.log("length value::",this.length-1);
      $("input#table_allias_name"+this.length).val(name);

    //  (<FormControl> this.entryForm.controls['components.table_allias_name'+this.length]).setValue(name);

    //  this.entryForm.get(<formControlName>).setValue("name");
    //  (<FormArray>this.entryForm.get("components")).push(this.initLinesForm());

    //  (<FormArray>this.entryForm.get("components")).setValue(this.initLinesForm().controls[]);

     // this.entryForm.controls.component.setValue("table_allias_name"+this.length);
     //  this.form.controls.orders.patchValue(this.orders[0].id);




    }

    onRemoveLines(i){

    }

}
