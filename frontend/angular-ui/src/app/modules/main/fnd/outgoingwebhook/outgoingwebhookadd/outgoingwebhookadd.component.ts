import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IncomingwebhookService } from 'src/app/services/fnd/incomingwebhook.service';
import { OutgoingwebhookService } from 'src/app/services/fnd/outgoingwebhook.service';

@Component({
  selector: 'app-outgoingwebhookadd',
  templateUrl: './outgoingwebhookadd.component.html',
  styleUrls: ['./outgoingwebhookadd.component.scss']
})
export class OutgoingwebhookaddComponent implements OnInit {
  public entryForm: FormGroup;
  entitydata;
  error;
  data;
  constructor(private _fb: FormBuilder,private router: Router,private webhookservice:OutgoingwebhookService,
    private route: ActivatedRoute, private toastr: ToastrService, private inwebservice:IncomingwebhookService) { }

  ngOnInit(): void {
    this.entryForm = this._fb.group({
      webhook_name:[null],
      description: [null],
      on_entity:[null],
      on_event:[null],
      on_incoming_webhook:[null],
      outgoing_Lines: this._fb.array([this.initLinesForm()]),
    });
    this.getonentity();
    this.getallincoming();
  }
  initLinesForm() {
    return this._fb.group({
      model: ''
      //model:JSON.stringify(this.nodeField)
    });
  }
  getallincoming(){
    this.inwebservice.incomegetall().subscribe((data)=>{
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
  getonentity(){
    this.webhookservice.getallentity().subscribe((data)=>{
      console.log(data);
      this.entitydata=data;
    })

  }
  goback(){
    this.router.navigate(["../all"], { relativeTo: this.route });
  }
  onSubmit(){
console.log(this.entryForm.value);
this.webhookservice.post(this.entryForm.value).subscribe((data)=>{
  console.log(data);
  if(data){
    this.toastr.success("Added");
  }
}, (error: HttpErrorResponse)=>{
  console.log(error);
  if(error.status===202){
    this.toastr.success("Added");
  }
  if(error.status===400){
    this.toastr.error(error.error);
  }

});
this.router.navigate(["../all"], { relativeTo: this.route });
  }
}
