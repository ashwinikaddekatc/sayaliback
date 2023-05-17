import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {SureapiService} from '../../../../services/admin/sureapi.service'
@Component({
  selector: 'app-sureapi',
  templateUrl: './sureapi.component.html',
  styleUrls: ['./sureapi.component.scss']
})
export class SureapiComponent implements OnInit {
  public entryForm:FormGroup;
  getdata;
  constructor(private _fb:FormBuilder,private sureapi:SureapiService, private toastr:ToastrService,) { }

  ngOnInit(): void {
    this.entryForm = this._fb.group({
      request_method : [null],
      url: [null],
      body : [null],
      type:[null],
      token:[null],
      username:[null],
     password:[null],
    });
  }
onsubmit(){
  console.log(this.entryForm.value);
  this.sureapi.createpostman(this.entryForm.value.url,this.entryForm.value.body,this.entryForm.value.request_method,this.entryForm.value.token).subscribe((data)=>{
    console.log(data);
    this.getdata=JSON.stringify(data);
    if (data) {
      this.toastr.success('successfully Run');
    }
  },
  (error) => {
    console.log('Error in adding data...',+error);
      if(error){
        this.toastr.error(' Getting Some Error');
      }
  });
}
}
