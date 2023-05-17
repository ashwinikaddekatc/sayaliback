import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { StudentaddService } from 'src/app/services/fnd/studentadd.service';
@Component({
  selector: 'app-stepper1',
  templateUrl: './stepper1.component.html',
  styleUrls: ['./stepper1.component.scss']
})
export class Stepper1Component implements OnInit {
  rowSelected :any= {};

  loading = false;
  college;
  error;
  constructor( private mainService: StudentaddService,) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.mainService.getAll().subscribe((data) => {
      console.log(data);
      this.college = data;
      this.college = data.author;
      if(this.college.length==0){
        this.error="No data Available";
        console.log(this.error)
      }
    },(error) => {
      console.log(error);
      if(error){
       this.error="Server Error";
     }
    });
  }
}
