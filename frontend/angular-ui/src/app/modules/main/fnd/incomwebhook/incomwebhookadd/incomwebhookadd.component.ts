import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IncomingwebhookService } from 'src/app/services/fnd/incomingwebhook.service';

@Component({
  selector: 'app-incomwebhookadd',
  templateUrl: './incomwebhookadd.component.html',
  styleUrls: ['./incomwebhookadd.component.scss']
})
export class IncomwebhookaddComponent implements OnInit {
  public entryForm: FormGroup;

  genaratednode = {
    userkey : '',
    token:'',
    apikey: '',
    url: '',

};
  constructor(private _fb: FormBuilder,private router: Router,private webhookservice:IncomingwebhookService,
    private route: ActivatedRoute, private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.entryForm = this._fb.group({
      webhook_name:[null],
      description: [null],
      is_active: [true],
      user_key:[null],
      token: [null],
      api_key: [null],
      url: [null],

    });
  }
  onSubmit(){
console.log(this.entryForm.value);
this.webhookservice.incomepost(this.entryForm.value).subscribe((data)=>{
  console.log(data);
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
  userkeygenerate(){
    this.webhookservice.generateuserkey().subscribe((data)=>{
      console.log(data);
    }, (error: HttpErrorResponse)=>{
      console.log(error);
      if(error.status===202){
        this.toastr.success(error.error.text);
        this.genaratednode.userkey=error.error.text;
      }
      if(error.status===400){
        this.toastr.error(error.error);
      }

    })
  }
  urlstatic="http://13.126.217.36:30166/api/webhook";
  urlvalue;
  apikeygenerate(){
    this.webhookservice.generateapikey().subscribe((data)=>{
      console.log(data);
    }, (error: HttpErrorResponse)=>{
      console.log(error);
      if(error.status===202){
        this.toastr.success(error.error.text);
        this.genaratednode.apikey=error.error.text;
        this.urlvalue=`${this.urlstatic}/${this.genaratednode.userkey}/${this.genaratednode.apikey}`;
      }
      if(error.status===400){
        this.toastr.error(error.error);
      }

    })
  }
  tokengenerate(){
    this.webhookservice.generatetokenkey().subscribe((data)=>{
      console.log(data);
    }, (error: HttpErrorResponse)=>{
      console.log(error);
      if(error.status===202){
        this.toastr.success(error.error.text);
        this.genaratednode.token=error.error.text;
      }
      if(error.status===400){
        this.toastr.error(error.error);
      }

    })
  }
  urlgenerate(){
    if(this.genaratednode.userkey==null){
      this.toastr.error("plz First generate userkey")
    }
    this.webhookservice.generateurlkey().subscribe((data)=>{
      console.log(data);

    }, (error: HttpErrorResponse)=>{
      console.log(error);
      if(error.status===202){
        this.toastr.success(error.error.text);
        this.genaratednode.url=error.error.text;
      }
      if(error.status===400){
        this.toastr.error(error.error);
      }

    })
  }
  goback(){
    this.router.navigate(["../all"], { relativeTo: this.route });
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
