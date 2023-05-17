import { Component, OnInit } from '@angular/core';
import { ChartConfiguration,  ChartDataSets,  ChartOptions } from 'chart.js';
@Component({
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.scss']
})
export class BubbleChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public bubbleChartOptions: ChartConfiguration['options'] = {
    // scales: {
    //   x: {
    //     min: 0,
    //     max: 30,
    //     ticks: {}
    //   },
    //   y: {
    //     min: 0,
    //     max: 30,
    //     ticks: {}
    //   },
    //   plugins: {
    //     title: {
    //       display: true,
    //       text: 'Bubble Chart'
    //     }
    //   }
    // }
  };

  public bubbleChartType: string = 'bubble';
 // public bubbleChartLegend = true;
  public bubbleChartData: ChartDataSets[] = [
    {
      data: [
        { x: 10, y: 10, r: 10 },
        { x: 15, y: 5, r: 15 },
        { x: 26, y: 12, r: 23 },
        { x: 7, y: 8, r: 8 },
      ],
      label: 'Investment Equities',
      backgroundColor: [
        'red',
        'green',
        'blue',
        'purple',
        'yellow',
        'brown',
        'magenta',
        'cyan',
        'orange',
        'pink'
      ],
      borderColor: 'blue',
      hoverBackgroundColor: 'purple',
      hoverBorderColor: 'red',
    },
  ];

   // events
	public chartClicked(e: any): void {
		console.log(e);
	}

	public chartHovered(e: any): void {
		console.log(e);
	}
}
