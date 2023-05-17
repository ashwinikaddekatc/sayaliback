import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OutgoingwebhookService } from 'src/app/services/fnd/outgoingwebhook.service';

@Component({
  selector: 'app-webhookworkflow',
  templateUrl: './webhookworkflow.component.html',
  styleUrls: ['./webhookworkflow.component.scss']
})
export class WebhookworkflowComponent implements OnInit {
  loading = false;
  error;
  selected: any[] = [];
  rowSelected :any= {};
  modaldelete=false;
  data;
  constructor(private outservice:OutgoingwebhookService,private router: Router, private toastr: ToastrService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getall();
  }
getall(){
  this.outservice.getallworkflow().subscribe((data)=>{
    console.log(data);
    this.data=data;
  })
}
goto(id:any){
  this.router.navigate(["../webhookworkflow1/" + id], { relativeTo: this.route });
}
}
