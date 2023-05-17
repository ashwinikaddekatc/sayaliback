import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from 'src/app/services/excel.service';
import { OutgoingwebhookService } from 'src/app/services/fnd/outgoingwebhook.service';

@Component({
  selector: 'app-webhook',
  templateUrl: './webhook.component.html',
  styleUrls: ['./webhook.component.scss']
})
export class WebhookComponent implements OnInit {
  loading = false;
  error;
  selected: any[] = [];
  rowSelected :any= {};
  modaldelete=false;
  data;
  constructor(private router: Router, private toastr: ToastrService,private outservice:OutgoingwebhookService,
    private route: ActivatedRoute, private excel: ExcelService,) { }

  ngOnInit(): void {
    this.getall();
  }
  getall(){
    this.outservice.wall().subscribe((data)=>{
      console.log(data);
      this.data=data;
      if(data.length == 0){
        this.error="No data Available";
      }
      if(data.operationMessage =='Your Access is Denied Plz contact Admin'){
        this.toastr.error('Your Not Authorized To Access This Endpoint plz Contact Admin');

       }

     // this.projectsetup = data.items;
     // this.projectname=data.projectname;
    },(error) => {
      console.log(error);
      if(error){
       this.error="No data Available OR server Error";
     }
    });
  }
}
