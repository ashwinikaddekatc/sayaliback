import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IncomingwebhookService } from 'src/app/services/fnd/incomingwebhook.service';

@Component({
  selector: 'app-incomwebhookedit',
  templateUrl: './incomwebhookedit.component.html',
  styleUrls: ['./incomwebhookedit.component.scss']
})
export class IncomwebhookeditComponent implements OnInit {
id:any;
tdata:any={};
  constructor(private _fb: FormBuilder,private router: Router,private webhookservice:IncomingwebhookService,
    private route: ActivatedRoute,private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    console.log("update with id = ", this.id);
    this.getById(this.id);
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
  goback(){
    this.router.navigate(["../../all"], { relativeTo: this.route });
  }
  userkeygenerate(){
    this.webhookservice.generateuserkey().subscribe((data)=>{
      console.log(data);
    }, (error: HttpErrorResponse)=>{
      console.log(error);
      if(error.status===202){
        this.toastr.success("Generated");
      }
      if(error.status===400){
        this.toastr.error(error.error);
      }

    })
  }
  apikeygenerate(){
    this.webhookservice.generateuserkey().subscribe((data)=>{
      console.log(data);
    }, (error: HttpErrorResponse)=>{
      console.log(error);
      if(error.status===202){
        this.toastr.success("Generated");
      }
      if(error.status===400){
        this.toastr.error(error.error);
      }

    })
  }
  tokengenerate(){
    this.webhookservice.generateuserkey().subscribe((data)=>{
      console.log(data);
    }, (error: HttpErrorResponse)=>{
      console.log(error);
      if(error.status===202){
        this.toastr.success("Generated");
      }
      if(error.status===400){
        this.toastr.error(error.error);
      }

    })
  }
  urlgenerate(){
    this.webhookservice.generateuserkey().subscribe((data)=>{
      console.log(data);
    }, (error: HttpErrorResponse)=>{
      console.log(error);
      if(error.status===202){
        this.toastr.success(error.error.text);
      }
      if(error.status===400){
        this.toastr.error(error.error);
      }

    })
  }

  copied;
  copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);

if(inputElement.setSelectionRange){
  this.toastr.success("Copy Succesfully");
  this.copied=("Copy Succesfully")
}
  }

}
