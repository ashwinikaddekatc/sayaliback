import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {SureconnectService} from '../../../../services/admin/sureconnect.service'
@Component({
  selector: 'app-editsureconnect',
  templateUrl: './editsureconnect.component.html',
  styleUrls: ['./editsureconnect.component.scss']
})
export class EditsureconnectComponent implements OnInit {
id:number;
editdata:any={}
  constructor( private route:ActivatedRoute,
    private router: Router,
    private sureconnectservice:SureconnectService,) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    console.log("update with id = ", this.id);
    this.getById(this.id);
  }
  getById(id:any){
this.sureconnectservice.getOne(id).subscribe((data)=>{
  this.editdata=data;
  console.log(this.editdata);
})
  }
onupdate(){
this.sureconnectservice.update(this.editdata,this.id).subscribe((data)=>{
  console.log(data);
})
}
}
