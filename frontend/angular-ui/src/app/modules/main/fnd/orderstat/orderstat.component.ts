import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../services/api/order.service';
import { Router } from '@angular/router';
import { NgxChartsModule} from '@swimlane/ngx-charts';
import { mergeMap } from 'rxjs/operators';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { ChartDataSets, ChartType } from 'chart.js';



@Component({
  selector: 'app-orderstat',
  templateUrl: './orderstat.component.html',
  styleUrls: ['./orderstat.component.scss']
})
export class OrderstatComponent implements OnInit {
  view: any[] = [460, 180];
  ordersByStatusData : any[] = [];
  ordersByPaymentData: any[] = [];
  ordersByCountryData: any[] = [];
  surveyData = [
    { name: 'Bikes', value: 105000 },
    { name: 'Cars', value: 55000 },
    { name: 'Trucks', value: 15000 },
    { name: 'Scooter', value: 150000 },
    { name: 'Bus', value: 20000 }
  ];

  colorScheme = {
      domain: ['#007cbb', '#61c673', '#ff8e28', '#ef2e2e']
  };
  barColorScheme = {
      domain: ['#007cbb']
  }
  invoiceScheme = {
    domain: ['#007cbb','#ff8e28', '#ef2e2e']
}
  invoicedata: any[]=[];

//Line chart data
  lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Commited Projects' },
  ];

  lineChartLabels: Label[] = ['Jan', 'Feb', 'March', 'April', 'May', 'June'];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

// doughnut Chart Data
doughnutChartLabels: Label[] = ['Project', 'Repository', 'Wireframe'];
  doughnutChartData: MultiDataSet = [
    [55, 25, 20]
  ];
  doughnutChartType: ChartType = 'doughnut';

myproject;
sharedcount;
notification;
er;
error;
  constructor(
    private router: Router,
        private orderService: OrderService,

  ) { }

  ngOnInit(): void {
    var me = this;
    this.myprojectcount()
    this.shareddcount();
    this.getndetails();
       // this.getPageData()
  }
  myprojectcount(){
    this.orderService.getmyprojectcount().subscribe((data)=>{
      console.log(data);
      this.myproject=data;
    })
  }
  shareddcount(){
    this.orderService.getsharedprocount().subscribe((data)=>{
      console.log(data);
      this.sharedcount=data;
    })
  }
  getPageData() {
    var me = this;

    /**
     * This is an Example of sequencing RxJS observable using mergeMap
     * (We are sequencing the API calls as the H2 DB used by the backend is failing to serve multiple request at once)
     */
    me.orderService.getOrderStats("status")
    .pipe(
        mergeMap(function(statusData) {
            me.ordersByStatusData = statusData.items;
            console.log("Received Orders By Status");
            console.log(this.ordersByStatusData);
            return me.orderService.getOrderStats("paytype");
        }))
        .pipe(
            mergeMap( function(payTypeData) {
                me.ordersByPaymentData = payTypeData.items;
                console.log("Received Orders By Payment Type");
                console.log(me.ordersByPaymentData);
                return me.orderService.getOrderStats("country")
            }))
            .subscribe(function(countryData){
                me.ordersByCountryData = countryData.items;
                console.log(me.ordersByCountryData);
                console.log("Received Orders By Country");

            });
/*      .mergeMap(function(statusData) {
        me.ordersByStatusData = statusData.items;
        console.log("Received Orders By Status");
        return me.orderService.getOrderStats("paytype");
    }).mergeMap( function(payTypeData) {
        me.ordersByPaymentData = payTypeData.items;
        console.log("Received Orders By Payment Type");
        return me.orderService.getOrderStats("country")
    }).subscribe(function(countryData){
        me.ordersByCountryData = countryData.items;
        console.log("Received Orders By Country");
    }); */



}
getndetails(){
  this.orderService.getnotdetails().subscribe((data)=>{
    console.log(data);
    this.notification=data;
    if(data.length == 0){
      this.er="No data Available";
      console.log(this.er);
    }
  },(error) => {
    console.log(error);
    if(error){
     this.error="No data Available OR server Error";
   }
  })
}
}
