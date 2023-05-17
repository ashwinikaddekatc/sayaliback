import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Webhookservicesui1Service } from 'src/app/services/fnd/webhookservicesui1.service';

@Component({
  selector: 'app-addwebhook1',
  templateUrl: './addwebhook1.component.html',
  styleUrls: ['./addwebhook1.component.scss']
})
export class Addwebhook1Component implements OnInit {
  entryForm: any;


  constructor(private _fb:FormBuilder,private obj: Webhookservicesui1Service,private router:Router, private route:ActivatedRoute, private toastr:ToastrService) { }

  ngOnInit(): void {

    // this.entryForm = new FormGroup({
    //   username: new FormControl(''),
    //   password: new FormControl(''),
    // })

    this.entryForm = this._fb.group({
      host: [null],
      mailStoreType: [null],
      username: [null],
      password: [null],
    });

  }



  postdata() {
    console.log(this.entryForm.value);
    this.obj.getAllpost(this.entryForm.value).subscribe((data) => {
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




