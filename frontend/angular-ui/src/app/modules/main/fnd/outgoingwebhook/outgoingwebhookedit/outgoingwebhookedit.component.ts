import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OutgoingwebhookService } from 'src/app/services/fnd/outgoingwebhook.service';
import { IncomingwebhookService } from 'src/app/services/fnd/incomingwebhook.service';

@Component({
  selector: 'app-outgoingwebhookedit',
  templateUrl: './outgoingwebhookedit.component.html',
  styleUrls: ['./outgoingwebhookedit.component.scss']
})
export class OutgoingwebhookeditComponent implements OnInit {
id:any;
tdata:any={};
entitydata;
error;
data;
  constructor(private _fb: FormBuilder,private router: Router,private webhookservice:OutgoingwebhookService,
    private route: ActivatedRoute, private toastr: ToastrService,private inwebservice:IncomingwebhookService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    console.log("update with id = ", this.id);
    this.getById(this.id);
    this.getonentity();
    this.getallincoming();
  }
  getById(id: number) {
    this.webhookservice.getById(id).subscribe((data) => {
        this.tdata = data;
        console.log(this.tdata)

      },
      (err) => {
        console.log(err);
      }
    );
  }
  getonentity(){
    this.webhookservice.getallentity().subscribe((data)=>{
      console.log(data);
      this.entitydata=data;
    })

  }
  goback(){
    this.router.navigate(["../../all"], { relativeTo: this.route });
  }
  onSubmit(){
    this.webhookservice.update(this.id,this.tdata).subscribe((data)=>{
      console.log(data);
      if(data){
        this.toastr.success("Updated Successfully");
      }
      this.router.navigate(["../../all"], { relativeTo: this.route });
    },
    (err) => {
      console.log(err);
      if(err){
        this.toastr.error("Not Updated Successfully");
      }
    })
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
        },(error) => {
          console.log(error);
          if(error){
           this.error="No data Available OR server Error";
         }
        });
      }
}
