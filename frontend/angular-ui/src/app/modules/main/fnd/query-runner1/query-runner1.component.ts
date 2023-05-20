import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { QueryRunnerService } from 'src/app/services/api/query-runner.service';
import { ReportBuilderService } from 'src/app/services/api/report-builder.service';

@Component({
  selector: 'app-query-runner1',
  templateUrl: './query-runner1.component.html',
  styleUrls: ['./query-runner1.component.scss']
})
export class QueryRunner1Component implements OnInit {
  public entryForm: FormGroup;
  submitted = false;
  selectedfrom;
  selectedto;
  report_id: number;
  reportname;
  date_list = [];
  adhoc_list = [];
  columns: any[];
  rows:any[];
  constructor( private route: ActivatedRoute,private _fb: FormBuilder,
    private queryRunnerService: QueryRunnerService,
    private reportBuilderService: ReportBuilderService) { }

  ngOnInit(): void {
    this.myDateValue = new Date("07-06-2022");
    this.duplicateArray=this.array;
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
  getById(id: number) {
    console.log("Report Id under getby id method::",id);

    this.queryRunnerService.getById(id).subscribe((data) =>
    {
      console.log(data);
      this.reportname=data.report_name;
      var dates = [];
      var adhoc_param = [];
        this.reportBuilderService.getMasterData(data.master_select).subscribe((data) => {
            this.rows = data;
            console.log(this.rows);
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
  getHeaders() {
    let headers: string[] = [];
    if(this.rows) {
      this.rows.forEach((value) => {
        Object.keys(value).forEach((key) => {
          if(!headers.find((header) => header == key)){
            headers.push(key)
          }

        })

      })
    }
    return headers;
  }
  onSubmit(){

  }
  modo2(val){
    console.log(val);
    this.selectedfrom=val;

  }
  modo3(val){
    console.log(val);
this.selectedto=val;

  }
  std1:string;
  addStd1(name:string){
    this.std1=" and products.name="+name;
  }

  std2:string;
  addStd2(name:string){
    this.std2=" and products.address="+name;
  }
  /// static json and code
  public array=[
    {
      "id": 1,
      "name": "Jack",
      "fromDate": "01-03-2023",
      "toDate": "03-06-2023"
    },
    {
      "id": 2,
      "name": "Allen",
      "fromDate": "18-05-2023",
      "toDate": "12-08-2023"
    },
    {
      "id": 3,
      "name": "Annie",
      "fromDate": "11-05-2023",
      "toDate": "19-05-2023"
    },
    {
      "id": 4,
      "name": "ashok",
      "fromDate": "01-01-2023",
      "toDate": "02-02-2023"
    },
    {
      "id": 5,
      "name": "Anu",
      "fromDate": "29-11-2020",
      "toDate": "01-06-2021"
    },
    {
      "id": 6,
      "name": "thrymr",
      "fromDate": "04-04-2023",
      "toDate": "15-05-2023"
    }
  ]
  duplicateArray=[];
  myDateValue: Date;
  toDate:Date;
  reverseAndTimeStamp(dateString) {
    const reverse = new Date(dateString.split("-").reverse().join("-"));
    return reverse.getTime();
    }
filterDate() {
    let fromdate=moment(this.myDateValue).format('DD-MM-YYYY');
console.log(fromdate)
let todate=moment(this.toDate).format('DD-MM-YYYY');
if(this.myDateValue && this.toDate){
const selectedMembers = this.array.filter(m => {
        return this.reverseAndTimeStamp(m.fromDate) >= this.reverseAndTimeStamp(fromdate) && this.reverseAndTimeStamp(m.fromDate) <= this.reverseAndTimeStamp(todate)
    }
    );
    this.duplicateArray=selectedMembers
}else{
this.duplicateArray=this.array
}

    console.log(this.duplicateArray); // the result objects
}

sysdate: Date;
dateParameter: string;
from_date: Date;
to_date: Date;

calculateThisWeek(): void {
  // Calculate the current date
  const currentDate = new Date();
console.log(currentDate)
  // Get the day of the week (0-6, where 0 is Sunday)
  const currentDayOfWeek = currentDate.getDay();

  // Calculate the number of days to subtract to get to Monday
  const daysToMonday = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;

  // Calculate the date of Monday of the current week
  this.from_date = new Date(currentDate);
  this.from_date.setDate(currentDate.getDate() - daysToMonday);

  // Calculate the date of Sunday of the current week
  this.to_date = new Date(this.from_date);
  this.to_date.setDate(this.from_date.getDate() + 6);
  console.log(this.from_date);
  this.myDateValue=this.from_date;
  console.log(this.to_date);
  console.log(this.myDateValue);
  this.toDate=this.to_date;
  console.log(this.sysdate);
  this.filterDate();
}
calculateLastWeek(): void {
  // Calculate the current date
  const currentDate = new Date();

  // Get the day of the week (0-6, where 0 is Sunday)
  const currentDayOfWeek = currentDate.getDay();

  // Calculate the number of days to subtract to get to Monday
  const daysToMonday = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;

  // Calculate the date of Monday of the previous week
  this.from_date = new Date(currentDate);
  this.from_date.setDate(currentDate.getDate() - daysToMonday - 7);

  // Calculate the date of Sunday of the previous week
  this.to_date = new Date(this.from_date);
  this.to_date.setDate(this.from_date.getDate() + 6);
  this.myDateValue=this.from_date;
  console.log(this.to_date);
  console.log(this.myDateValue);
  this.toDate=this.to_date;
  console.log(this.sysdate);
  this.filterDate();
}
select(val:any){
console.log(val);
    if(val === 'This Week'){
    this.calculateThisWeek()
    }else if(val === 'Last Week'){
this.calculateLastWeek()

      }

}
}
