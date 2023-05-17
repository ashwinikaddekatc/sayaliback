import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SftplocationService } from 'src/app/services/fnd/sftplocation.service';

@Component({
  selector: 'app-sftpadd',
  templateUrl: './sftpadd.component.html',
  styleUrls: ['./sftpadd.component.scss']
})
export class SftpaddComponent implements OnInit {
  public entryForm: FormGroup;
  tech_stack_key = ["aspmy", "sphmy"];
  submitted = false;
  constructor( private _fb: FormBuilder,
    private router: Router,private toastr: ToastrService,
    private route: ActivatedRoute,
    private sftpService:SftplocationService) { }

  ngOnInit(): void {
    this.entryForm = this._fb.group({
      host: [null],
      port: [null],
      user: [null],
      password: [null],
    });

  }
  onSubmit() {
    console.log(this.entryForm.value);
    // this.submitted = true;
    // if (this.entryForm.invalid) {
    //   return;
    // }
    this.onCreate();
  }

  onCreate() {

    this.sftpService.saveSftpData(this.entryForm.value).subscribe(
      (data) => {
        console.log(data);
        if(data){
          this.toastr.success("Added Successfully");
        }
        this.router.navigate(["../all"], { relativeTo: this.route });
      },
      (error) => {
        console.log(error);
        const objectArray = Object.entries(error.error.fieldErrors);
        objectArray.forEach(([k, v]) => {
          console.log(k);
          console.log(v);
          if(error){
            this.toastr.success(" Not Added getting some error");
          }
        });

      }
    );
  }
  cancel(){
    this.router.navigate(["../all"], { relativeTo: this.route });
  }
}
