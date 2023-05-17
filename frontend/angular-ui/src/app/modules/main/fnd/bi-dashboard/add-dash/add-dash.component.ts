import { Component, OnInit } from '@angular/core';
import { ValidationError } from 'src/app/models/fnd/ValidationError';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BiDashSetupService } from 'src/app/services/fnd/bi-dash-setup.service';
@Component({
  selector: 'app-add-dash',
  templateUrl: './add-dash.component.html',
  styleUrls: ['./add-dash.component.scss']
})
export class AddDashComponent implements OnInit {
  public entryForm: FormGroup;
  submitted = false;
  basic: boolean = false;
  moduleId: number;

  fieldErrors: ValidationError[] = [];
  section_types:[
    "1*1",
    "1*2"
  ]
  constructor(private _fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dashService: BiDashSetupService) { }

  ngOnInit(): void {
    this.moduleId = this.dashService.getModuleId(); // get from session storage
    console.log("module id:;",this.moduleId)
    this.entryForm = this._fb.group({
      dashboard_name: [null],
      components: this._fb.array([this.initLinesForm()]),
    });
  }
  initLinesForm() {
    return this._fb.group({
      // label: [null],
      // type: [null],
      // mapping: [null],
      // mandatory: [null],
      // readonly: [null],
      // drop_values: [null],
      // sp: [null],
      section_type:[null]
    });
  }

  get controls() {
    return (this.entryForm.get("components") as FormArray).controls;
  }

  onAddLines() {
    (<FormArray>this.entryForm.get("components")).push(this.initLinesForm());
  }

  onRemoveLines(index: number) {
    (<FormArray>this.entryForm.get("components")).removeAt(index);
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
    this.fieldErrors = [];
    this.dashService.create(this.entryForm.value,this.moduleId).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(["../all-dash"], { relativeTo: this.route });
      },
      (error) => {
        console.log(error);
        const objectArray = Object.entries(error.error.fieldErrors);
        objectArray.forEach(([k, v]) => {
          console.log(k);
          console.log(v);
          this.fieldErrors.push({ field: k, message: v });
        });
        console.log(this.fieldErrors); // this will come from backend
      }
    );
  }
}
