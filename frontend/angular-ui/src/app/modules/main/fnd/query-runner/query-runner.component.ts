import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ValidationError } from 'src/app/models/fnd/ValidationError';
import { QueryRunnerService } from 'src/app/services/api/query-runner.service';
import { ReportBuilderService } from 'src/app/services/api/report-builder.service';
@Component({
  selector: 'app-query-runner',
  templateUrl: './query-runner.component.html',
  styleUrls: ['./query-runner.component.scss']
})
export class QueryRunnerComponent implements OnInit {
  public entryForm: FormGroup;
  submitted = false;
  basic: boolean = false;
  fieldErrors: ValidationError[] = [];
  report_id: number;
  columns: any[];
  rows:any[];
  date_list = [];
  adhoc_list = [];
  constructor(private _fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private queryRunnerService: QueryRunnerService,
    private reportBuilderService: ReportBuilderService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.report_id = +params['report_id'];
    });
    console.log("Report id:",this.report_id);

    this.getById(this.report_id);
    this.entryForm = this._fb.group({
      date_para:[null],
      from_date:[null],
      adhoc_para:[null],
      condition:[null],
      value_1:[null],
      value_2:[null],
      para_pane: [null]
    });
  }
  onSubmit(){
    console.log("Para value:",this.entryForm.value.para_pane);
    var condition=this.entryForm.value.para_pane;

    this.queryRunnerService.getById(this.report_id).subscribe((data) =>
    {
      var dates = [];
      var adhoc_param = [];
      console.log("Complete query with contion::",data.master_select+condition);

        this.reportBuilderService.getMasterData(data.master_select+condition).subscribe((data) => {
            this.rows = data;
            var j;
            var cart = [];


          for(var i = 0; i < data.length; i++)
          {
            var columnsIn = data[i];
            if(i==1)
            {
                for(var key in columnsIn)
                {
                j={prop:key , name: key};
                cart.push(j)

                }
            }
          }
          this.columns = cart;

        });
     });

  }

  getById(id: number) {
    console.log("Report Id under getby id method::",id);

    this.queryRunnerService.getById(id).subscribe((data) =>
    {
      var dates = [];
      var adhoc_param = [];
        this.reportBuilderService.getMasterData(data.master_select).subscribe((data) => {
            this.rows = data;
            var j;
            var cart = [];


          for(var i = 0; i < data.length; i++)
          {
            var columnsIn = data[i];
            if(i==1)
            {
                for(var key in columnsIn)
                {
                j={prop:key , name: key};
                cart.push(j)

                }
            }
          }
          this.columns = cart;

        });

        //for date list param
        var str = data.date_string;
        var myarray = str.split(',');
        for(var i = 0; i < myarray.length; i++)
        {
          console.log(myarray[i]);
         // this.date_list[myarray[i]+","];
          dates.push(myarray[i])
        }
        this.date_list=dates

        //for adhoc param
        var str2 = data.add_param_string;
        var adhoc = str2.split(',');
        for(var i = 0; i < adhoc.length; i++)
        {
          adhoc_param.push(adhoc[i])
        }
        this.adhoc_list=adhoc_param

    });


  }

      dateColumn:string;
      addDateParam(name:string){
        this.dateColumn=name;
     }

     v :string;
     onDateChange(date:string){
       this.v=" and "+this.dateColumn+"="+date;
     }

     onAddDate() {
      (<FormControl> this.entryForm.controls['para_pane']).setValue(this.v);
      }

      finalCondition:string;
      adhocColumn:string;
      addAdhocParam(name:string){
        console.log(name);
        this.adhocColumn=name;
      }

      condition:string;
      addCondition(name:string){
        if(name=="EQUAL")
        console.log(name);
        this.condition=name;
      }

      valu1:string;
      addValue1(name:string){
        console.log(name);
        this.valu1=name;
      }

      valu2:string;
      addValue2(name:string){

        this.valu2=name;
      }

      //add standard parameter
      std1:string;
      addStd1(name:string){

        this.std1=" and products.name="+name;
      }

      std2:string;
      addStd2(name:string){
        this.std2=" and products.address="+name;
      }

      strString1:string;
      strString2:string;
      onAddstdPara() {
        if(this.std1!==null || this.std1!==undefined){
          this.strString1=this.v+this.std1;
        }else{
          this.strString1=this.v;
        }

        if(this.std2!==null || this.std2!==undefined){
          this.strString2=+this.v+this.std2;
        }else{
          this.strString2=this.v;
        }
        (<FormControl> this.entryForm.controls['para_pane']).setValue(this.strString1+this.strString2);
        }


      stdParamCmplt:string;
      onAddAdhoc() {
        console.log(this.v);

        this.stdParamCmplt=this.strString1+this.strString2;
        this.finalCondition=this.v+" and "+this.adhocColumn+this.condition+this.valu1;
        if(this.condition==="BETWEEN"){
          this.finalCondition=this.v+this.stdParamCmplt+" and "+this.adhocColumn+" "+this.condition+" "+this.valu1+" AND "+this.valu2;
         }else{
          this.finalCondition=this.v+this.stdParamCmplt+" and "+this.adhocColumn+this.condition+this.valu1;
        }

        (<FormControl> this.entryForm.controls['para_pane']).setValue(this.finalCondition);
        }


}
