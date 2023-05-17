import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BiWidgetSetupService } from 'src/app/services/fnd/bi-widget-setup.service';
@Component({
  selector: 'app-test19',
  templateUrl: './test19.component.html',
  styleUrls: ['./test19.component.scss']
})
export class Test19Component implements OnInit {
  view: any[] = [460, 180];

  testdb1Data : any[] = [];
  testdb2Data : any[] = [];
  wig24Data : any[] = [];

      showXAxis = true;
      showYAxis = true;
      gradient = false;
      showLegend = true;
      showXAxisLabel = true;
      xAxisLabel = 'Country';
      showYAxisLabel = true;
      yAxisLabel = 'Sales';
      timeline = true;
      xAxis: boolean = true;
      yAxis: boolean = true;
      id:number;

      barColorScheme = {
          domain: ['#007cbb']
      }
      colorScheme = {
        domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
      };

  constructor(private router: Router,
    private route: ActivatedRoute,
    private orderService: BiWidgetSetupService  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    //this.getPageData()
    this.getPageData()
  }
  getPageData() {
    var me = this;
me.orderService.getOrderStats2("select count(*) as value, state as name from cnsdb_new.customers group by state").subscribe(function(testdb1Data2)
    {
       me.testdb1Data = testdb1Data2.items;
   });

me.orderService.getOrderStats2("select count(*) as value, state as name from cnsdb_new.customers group by state").subscribe(function(testdb2Data2)
    {
       me.testdb2Data = testdb2Data2.items;
   });me.orderService.getOrderStats2("select count(*) as value, state as name from cnsdb_new.customers group by state").subscribe(function(wig24Data2)
    {
       me.wig24Data = wig24Data2.items;
   });
    }
}
