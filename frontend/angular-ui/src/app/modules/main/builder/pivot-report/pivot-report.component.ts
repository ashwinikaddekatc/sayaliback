import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
// import { WebdatarocksComponent } from 'ng-webdatarocks';
// import * as Highcharts from "highcharts";
// import "webdatarocks/webdatarocks.highcharts.js";

@Component({
  selector: 'app-pivot-report',
  templateUrl: './pivot-report.component.html',
  styleUrls: ['./pivot-report.component.scss']
})
export class PivotReportComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
//   @ViewChild('pivot1') child: WebdatarocksComponent;
//   Highcharts: typeof Highcharts = Highcharts;

//   onPivotReady(pivot: WebDataRocks.Pivot): void {
//     console.log('[ready] WebdatarocksPivotModule', this.child);
//   }

//   public pivotReports = {
//     dataSource: {
//       filename: "https://cdn.webdatarocks.com/data/data.csv"
//     },
//     slice: {
//       rows: [{ uniqueName: "Country" }],
//       columns: [{ uniqueName: "Measures" }],
//       measures: [{ uniqueName: "Price", aggregation: "sum" }]
//     }
//   };

//   customizeToolbar(toolbar) {
//     var tabs = toolbar.getTabs(); // get all tabs from the toolbar
// console.log("toolbar  ",toolbar);

// // add new tab
//     // tabs.unshift({
//     //   id:"fm-tab-newtab",
//     //   title:"New Tab",
//     // rightGroup: true,
//     //  // handler:newtabHandler,
//     //   icon:`<clr-icon shape="container-volume" width="36" height="36"></clr-icon>`
//     //  });

//    // return tabs;

//     console.log("tabs  ",tabs);
//     toolbar.getTabs = function() {
//        tabs[3].rightGroup= true; //it will gives the tab to right side of report
//         delete tabs[7]; // delete the first tab
//         return tabs;
//     }
//    // console.log(toolbar.icons.connect);
//     toolbar.icons.connect = `<clr-icon shape="container-volume"></clr-icon>`;
// }

// // let newtabHandler=function() {
// //   alert(“New functionality!”);
// //   }

//   onCustomizeCell(
//     cell: WebDataRocks.CellBuilder,
//     data: WebDataRocks.CellData
//   ): void {
//     if (data.isClassicTotalRow) {
//       cell.addClass('fm-total-classic-r');
//     }
//     if (data.isGrandTotalRow) {
//       cell.addClass('fm-grand-total-r');
//     }
//     if (data.isGrandTotalColumn) {
//       cell.addClass('fm-grand-total-c');
//     }
//   }

//   onReportComplete(): void {
//     this.child.webDataRocks.off("reportcomplete");
//     this.createAreaChart();
//     this.createBarChart();
//   }

//   createAreaChart() {
//     this.child.webDataRocks.highcharts.getData(
//       {
//         type: "areaspline"
//       },
//       data => {
//         this.Highcharts.setOptions({
//           plotOptions: {
//             series: {
//               color: "#2a8000" // set colors of the series
//             }
//           }
//         });
//         this.Highcharts.chart("highchartsContainer-1", data);
//       },
//       data => {
//         this.Highcharts.setOptions({
//           plotOptions: {
//             series: {
//               color: "#2a8000" // set colors of the series
//             }
//           }
//         });
//         this.Highcharts.chart("highchartsContainer-1", data);
//       }
//     );
//   }
//   /* Create a bar chart that shows a preconfigured slice */
//   createBarChart() {
//     this.child.webDataRocks.highcharts.getData(
//       {
//         slice: {
//           rows: [{ uniqueName: "Country" }],
//           columns: [{ uniqueName: "Measures" }],
//           measures: [{ uniqueName: "Quantity", aggregation: "sum" }]
//         },
//         type: "bar"
//       },
//       data => {
//         this.Highcharts.setOptions({
//           plotOptions: {
//             series: {
//               color: "#00a3cc" // set colors of the series
//             }
//           }
//         });
//         this.Highcharts.chart("highchartsContainer-2", data);
//       },
//       data => {
//         this.Highcharts.setOptions({
//           plotOptions: {
//             series: {
//               color: "#00a3cc" // set colors of the series
//             }
//           }
//         });
//         this.Highcharts.chart("highchartsContainer-2", data);
//       }
//     );
//   }
}
