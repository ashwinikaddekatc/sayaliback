import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-query-runner1',
  templateUrl: './query-runner1.component.html',
  styleUrls: ['./query-runner1.component.scss']
})
export class QueryRunner1Component implements OnInit {
  public entryForm: FormGroup;
  submitted = false;
  constructor() { }

  ngOnInit(): void {
  }
  onSubmit(){

  }
  std1:string;
  addStd1(name:string){

    this.std1=" and products.name="+name;
  }

  std2:string;
  addStd2(name:string){
    this.std2=" and products.address="+name;
  }
}
