import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OutgoingwebhookService } from 'src/app/services/fnd/outgoingwebhook.service';

@Component({
  selector: 'app-webhookworkflow1',
  templateUrl: './webhookworkflow1.component.html',
  styleUrls: ['./webhookworkflow1.component.scss']
})
export class Webhookworkflow1Component implements OnInit {
  arrayTag;
  id;
  getbyiddata;
  constructor(private outservice:OutgoingwebhookService,private router: Router, private toastr: ToastrService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    console.log("update with id = ", this.id);
    this.getbyid(this.id);
  }
  getbyid(id:number){
    this.outservice.getbyidworkflow(id).subscribe((data)=>{
      this.getbyiddata=data;
      console.log(this.getbyiddata);
      this.arrayTag = JSON.parse(this.getbyiddata.json);
      console.log(this.arrayTag);
      // this.pid=this.getbyiddata.ref;
      // console.log(this.pid);
      // this.pdata(this.pid)

    })
    }
}
