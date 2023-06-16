import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-datefunction',
  templateUrl: './datefunction.component.html',
  styleUrls: ['./datefunction.component.scss']
})
export class DatefunctionComponent implements OnInit {
  modalselect:boolean=false;
  public array=[
    {
      "id": 1,
      "name": "Jack",
      "fromDate": "19-05-2023",
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
      "fromDate": "11-05-2023",//2023-11-05
      "toDate": "19-05-2023"
    },
    {
      "id": 4,
      "name": "ashok",
      "fromDate": "08-05-2023",
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
    },
    {
      "id": 7,
      "name": "Ab",
      "fromDate": "29-11-2022",
      "toDate": "01-06-2023"
    },
    {
      "id": 8,
      "name": "thakur",
      "fromDate": "04-04-2022",
      "toDate": "15-05-2022"
    }
  ];
  selectedfrom;
  selectedto;
  constructor() { }

  ngOnInit(): void {
    this.duplicateArray=this.array;
  }
  modo2(val){
    console.log(val);
    this.selectedfrom=val;

  }
  modo3(val){
    console.log(val);
this.selectedto=val;

  }
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
    this.modalselect=false;
}

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
    this.filterDate();
  }
  calculateThisMonth(): void {
    // Calculate the current date
    const currentDate = new Date();

    // Calculate the date of the first day of the current month
    this.from_date = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    // Calculate the date of the last day of the current month
    this.to_date = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    this.to_date.setDate(this.from_date.getDate() + 6);
    this.myDateValue=this.from_date;
    console.log(this.to_date);
    console.log(this.myDateValue);
    this.toDate=currentDate;
    this.filterDate();
  }

  calculateLastMonth(): void {
    // Calculate the current date
    const currentDate = new Date();

    // Calculate the date of the first day of the previous month
    this.from_date = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);

    // Calculate the date of the last day of the previous month
    this.to_date = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);

    this.to_date.setDate(this.from_date.getDate() + 6);
    this.myDateValue=this.from_date;
    console.log(this.to_date);
    console.log(this.myDateValue);
    this.toDate=this.to_date;
    this.filterDate();
  }
  calculateThisYear(): void {
    // Calculate the current date
    const currentDate = new Date();

    // Calculate the date of the first day of the current year
    this.from_date = new Date(currentDate.getFullYear(), 0, 1);

    // Calculate the date of the last day of the current year
    this.to_date = new Date(currentDate.getFullYear(), 11, 31);

    this.myDateValue=this.from_date;
    console.log(this.to_date);
    console.log(this.myDateValue);
    this.toDate=this.to_date;
    this.filterDate();
  }

  calculateLastYear(): void {
    // Calculate the current date
    const currentDate = new Date();

    // Calculate the date of the first day of the previous year
    this.from_date = new Date(currentDate.getFullYear() - 1, 0, 1);

    // Calculate the date of the last day of the previous year
    this.to_date = new Date(currentDate.getFullYear() - 1, 11, 31);

    this.myDateValue=this.from_date;
    console.log(this.to_date);
    console.log(this.myDateValue);
    this.toDate=this.to_date;
    this.filterDate();
  }
  select(val:any){
  console.log(val);
      if(val === 'This Week'){
      this.calculateThisWeek()
      }else if(val === 'Last Week'){
       this.calculateLastWeek()
      }else if(val === 'This Month'){
          this.calculateThisMonth()
       }else if(val === 'Last Month'){
            this.calculateLastMonth()
       }else if(val === 'To Specific FromDate To To Date'){
              this.openmodel()
       }
       else if(val === 'This Year'){
        this.calculateThisYear()
       }else if(val === 'Last Year'){
        this.calculateLastYear()
      }


  }
  openmodel(){
    this.modalselect=true;
            }

    condition;
    addCondition(name:any){
    // if(name=="EQUAL")
     console.log(name);
    this.condition=name;
     }
     std1:string;
     addStd1(name:string){
     this.std1=" and products.name="+name;
     console.log(this.std1);
     }
}
