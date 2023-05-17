import { Component, OnInit } from '@angular/core';
import {SurefarmService} from '../../../../services/builder/surefarm.service';
@Component({
  selector: 'app-surefarm',
  templateUrl: './surefarm.component.html',
  styleUrls: ['./surefarm.component.scss']
})
export class SurefarmComponent implements OnInit {
  surefarm: any;
  port:any;
  sure:any;
  constructor(private surefarmservice:SurefarmService) { }

  ngOnInit(): void {
    this.surefarmservice.getAll().subscribe((data) => {
      this.surefarm = data;
      console.log(data);
//port
for (let i = 0; i < data.length; i++){
this.sure=data[i].Ports;
console.log(this.sure);


    // let data1=JSON.stringify(this.sure);
  // console.log(data1);

}
    });
  }
  getValues(obj:any){
    let res = "";
    for (let index = 0; index < obj.length; index++) {
       console.log(obj[index]);
      //let keys = Object.keys(obj[index]);
    //   for (let i = 0; i < keys.length; i++) {
    //       res += obj[keys[i]];
    // }
  //  console.log(keys);

   //console.log(obj[3])
  }
  return res;}
}
