import { Component, OnInit } from '@angular/core';
import * as Highcharts from "highcharts/highcharts-gantt";
import { TourService } from '../../ngx-guided-tour/src/lib/tour.service';
@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.scss']
})
export class RoadmapComponent implements OnInit {
alldata;
  constructor(private tourservice: TourService,) { }

  ngOnInit(): void {
    this.tourservice.getroadmapall().subscribe((data)=>{
      this.alldata=data[0];
      console.log(this.alldata);
    })
  }
  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    title: {
      text: "Gantt Chart with Progress Indicators"
    },
    xAxis: {
      min: Date.UTC(2014, 10, 17),
      max: Date.UTC(2014, 10, 30)
    },
    series: [
      {
        type: "gantt",
        name: "Project 1",
        data: [
          {
            name: "Start prototype",
            start: Date.UTC(2014, 10, 18),
            end: Date.UTC(2014, 10, 25),
            completed: 0.25
          },
          {
            name: "Test prototype",
            start: Date.UTC(2014, 10, 27),
            end: Date.UTC(2014, 10, 29)
          },
          {
            name: "Develop",
            start: Date.UTC(2014, 10, 20),
            end: Date.UTC(2014, 10, 25),
            completed: {
              amount: 0.12,
              fill: "#fa0"
            }
          },
          {
            name: "Run acceptance tests",
            start: Date.UTC(2014, 10, 23),
            end: Date.UTC(2014, 10, 26)
          }
        ]
      }
    ]
  };

}
