import { Component, OnInit } from '@angular/core';
import { BuilddetailsService } from 'src/app/services/fnd/builddetails.service';

@Component({
  selector: 'app-builddetails',
  templateUrl: './builddetails.component.html',
  styleUrls: ['./builddetails.component.scss']
})
export class BuilddetailsComponent implements OnInit {
  alldata;
  loading = false;
  selected: any[] = [];
  constructor(private buildservice:BuilddetailsService) { }

  ngOnInit(): void {
    this.getall();
  }
  getall(){
this.buildservice.getall().subscribe((data)=>{
  console.log(data);
  this.alldata=data;
})
    }
}
