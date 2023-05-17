import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-codeworkflow',
  templateUrl: './codeworkflow.component.html',
  styleUrls: ['./codeworkflow.component.scss']
})
export class CodeworkflowComponent implements OnInit {
  json: string = "";
  stringJson: any;
  luisApp =
  {
    name: '',
    created: 1,
    trained: 1,
    tested: 1,
    updated:1,
    published: 1,

     };
     // Layout direction changing
    layout = {
    direction: "horizontal",
    block1: "clr-col-lg-12 clr-col-12 height container",
    block2: "clr-col-lg-12 clr-col-12 container",
  }
  timelineStyle = {
    step0: { state: "current", open: true, failed: false },
    step1: { state: "not-started", open: false, failed: false },
    step2: { state: "not-started", open: false, failed: false },


  };




  constructor() { }

  ngOnInit(): void {
  }
// Change to Horizontal Layout
changeToHorizonTal() {
  this.layout = {
    direction: "horizontal",
    block1: "clr-col-lg-12 clr-col-12 height container",
    block2: "clr-col-lg-12 clr-col-12 container",
  }
}
// Change to Vertical Layout
changeToVertical() {
  this.layout = {
    direction: "vertical",
    block1: "clr-col-lg-3 clr-col-12 ",
    block2: "clr-col-lg-9 clr-col-12 ",
  }
}
reset() {
  this.json = "";
  this.luisApp =
  {
    name: '',
    trained: 1,
    tested: 1,
    updated:1,
    published: 1,


    created: 1,

  };
  this.timelineStyle = {
    step0: { state: "current", open: true, failed: false },
    step1: { state: "not-started", open: false, failed: false },
    step2: { state: "not-started", open: false, failed: false },

  };
}
current()
{
console.log (this.timelineStyle)
this.stringJson = JSON.stringify(this.timelineStyle);
    console.log("String json object :", this.stringJson);


}
}
