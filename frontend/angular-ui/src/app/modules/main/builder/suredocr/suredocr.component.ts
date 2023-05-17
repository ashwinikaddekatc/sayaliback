import { Component, OnInit } from '@angular/core';
import '@cds/core/tag/register.js';
import {SuredokrService} from '../../../../services/builder/suredokr.service';
@Component({
  selector: 'app-suredocr',
  templateUrl: './suredocr.component.html',
  styleUrls: ['./suredocr.component.scss']
})
export class SuredocrComponent implements OnInit {
  suredokr: any;
  dokerid: Array<string>=[];
created:Array<string>=[];
  main: any;
  date: number;
  labels:Array<string>=[];
  keys:any;
  constructor(private suredokrservice:SuredokrService) { }

  ngOnInit(): void {
    this.suredokrservice.getAll().subscribe((data) => {
      this.suredokr = data;
      console.log(data);
      for(let i =0;i<data.length;i++){
         this.dokerid.push(data[i].Id)
         this.labels.push(data[i].Labels);
       }
      for(let i =0;i<data.length ;i++){
        if(data[i].Labels!=null)
        {
          this.created.push(data[i].Labels["org.opencontainers.image.created"]);
        }
      }
      // try

    });
  }
  getkeys(label:any) {
    if(label!=null){
    return Object.keys(label);
  }
  }

  getValue(label: any, key: string) {
    return label[key];
  }
}
