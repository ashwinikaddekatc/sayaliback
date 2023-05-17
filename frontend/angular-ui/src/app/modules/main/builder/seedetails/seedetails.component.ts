import { Component, OnInit } from '@angular/core';
import { WireframeLineService } from '../../../../services/builder/wireframe-line.service';
@Component({
  selector: 'app-seedetails',
  templateUrl: './seedetails.component.html',
  styleUrls: ['./seedetails.component.scss']
})
export class SeedetailsComponent implements OnInit {
  alldata;
  loading = false;
  selected: any[] = [];
  constructor(private service:WireframeLineService) { }

  ngOnInit(): void {
    this.getall();
  }
  getall(){
    this.service.getseedetails().subscribe((data)=>{
      console.log(data);
      this.alldata=data;
    })
    }
}
