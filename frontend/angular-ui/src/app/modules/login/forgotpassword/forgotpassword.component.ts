import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {ForgotpassService} from '../../../services/api/forgotpass.service';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
 public emailCheckForm: FormGroup;
  emailErrMsg: string = ""
emailsend;
  constructor(private _fb: FormBuilder,
    private router: Router,
    private route:ActivatedRoute,
    private toastr:ToastrService,
    private forgotpassservice:ForgotpassService) { }

  ngOnInit(): void {
    this.emailCheckForm = this._fb.group({
      email: ['', Validators.email]
    });
  }
  onsubmit(){
    let email = this.emailCheckForm.value.email;
    console.log(email);
    this.forgotpassservice.sendemail(email).subscribe((data)=>{
      this.forgotpassservice.storeEmail(email);
    console.log(data);

    // if(data=200){
    //   this.toastr.success('Email Send successfully');
    // }
    },
    (err: HttpErrorResponse) => {
      console.log(err)
      if (err.status === 200) {
        this.emailsend= "Email Is send Please Check Your Mail";
        //this.emailErrMsg = 'Email send please check mail';
      }
      if(err.status === 400){
        this.emailsend = "Couldn't find your Account";
      }

    }
    );
    this.emailCheckForm.reset();
  }
  onSubmit() {
    let email = this.emailCheckForm.value.email;
    console.log(email);
    this.forgotpassservice.sendemail(email).subscribe((res) => {
      this.forgotpassservice.storeEmail(email);
      //this.router.navigate(["/varify-account"])
    }, (err: HttpErrorResponse) => {
      console.log(err)
      if (err.status === 409) {
        this.emailErrMsg = 'Email Already Exists';
      } else {
        this.emailErrMsg = 'Server error';
      }
    })
  }
  gotoreset(){
    this.router.navigate(["../forgotresetpassword"], { relativeTo: this.route });
  }
}
