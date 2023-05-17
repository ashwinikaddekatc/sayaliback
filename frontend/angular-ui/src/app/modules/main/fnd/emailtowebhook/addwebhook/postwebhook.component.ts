import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NewwebhookService } from 'src/app/services/fnd/newwebhook.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-postwebhook',
  templateUrl: './postwebhook.component.html',
  styleUrls: ['./postwebhook.component.scss']
})
export class PostwebhookComponent implements OnInit {

  public entryForm: FormGroup;


  constructor(private _fb:FormBuilder, private router:Router, private route:ActivatedRoute, private newweb:NewwebhookService, private toastr:ToastrService){


  }
 
  ngOnInit(): void {

    // this.entryForm = this._fb.group({

    //   id:new FormControl(''),
    //   username:new FormControl(''),
    //   password:new FormControl('')

    // })
    this.entryForm = this._fb.group({
      host: [null],
      mailStoreType: [null],
      username: [null],
      password: [null],
    });
    
  }

  onSubmit(){
    console.log(this.entryForm.value);
    this.newweb.postAll(this.entryForm.value).subscribe((data)=>{
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
  goback(){

    this.router.navigate(["../all"], { relativeTo: this.route });
  }
}

