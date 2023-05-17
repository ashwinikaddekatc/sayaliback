import { Component, OnInit } from '@angular/core';
import { ValidationError } from 'src/app/models/fnd/ValidationError';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { StepperService} from 'src/app/services/fnd/stepper.service';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-addstepper',
  templateUrl: './addstepper.component.html',
  styleUrls: ['./addstepper.component.scss']
})
export class AddstepperComponent implements OnInit {
  public entryForm: FormGroup;
  submitted = false;
  basic: boolean = false;
  errorFields: ValidationError[] = [];
product:FormArray;
  constructor( private collegeService: StepperService,
    private _fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.entryForm = this._fb.group({
      studentname: [null],
      department: [null],
      joiningDate: [null],
      phone: [null],
      emailId:[null],
      wf_instance_id:[null]
   });
  }
  onSubmit() {
    console.log(this.entryForm.value);
    this.submitted = true;
    if (this.entryForm.invalid) {
      return;
    }
    this.onCreate();
  }
  onCreate() {

    this.collegeService.create(this.entryForm.value).subscribe(
      (data) => {
        console.log(data);
        this.ngOnInit();

        this.router.navigate(["../../stepper/all"], { relativeTo: this.route });
      },

    );
    if (this.entryForm.value) {
      this.toastr.success('Added successfully');
          }
  }


}
