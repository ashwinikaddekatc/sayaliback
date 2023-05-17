import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidationError } from 'src/app/models/fnd/ValidationError';
import { DynamicformService } from 'src/app/services/fnd/dynamicform.service';
import { Mapping } from "src/app/models/fnd/Mapping";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-adddynamicform',
  templateUrl: './adddynamicform.component.html',
  styleUrls: ['./adddynamicform.component.scss']
})
export class AdddynamicformComponent implements OnInit {
  public entryForm: FormGroup;
  submitted = false;
  basic: boolean = false;
  fieldErrors: ValidationError[] = [];
  related_to = ['Menu', 'Related To'];
  page_event = ['OnClick', 'OnBlur'];
  field_type = ['text', 'dropdown', 'date', 'checkbox', 'textarea', 'togglebutton'];
  mappings: Mapping[];
  constructor(private _fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private dynamicservice:DynamicformService,
    private httpService: HttpClient,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.getMapings();
    this.entryForm = this._fb.group({
      form_name: [null],
      form_desc: [null],
      related_to: [null],
      page_event: [null],
      button_caption: [null],
      components: this._fb.array([this.initLinesForm()]),
    });
  }
  getMapings() {
    this.httpService
      .get<Mapping[]>('./assets/json/form-setup-mapping.json')
      .subscribe(data => {
        console.log(data);
        this.mappings = data;
        }, err => console.log(err)
      )
  }
  initLinesForm() {
    return this._fb.group({
      label: [null],
      type: [null],
      mapping: [null],
      mandatory: [null],
      readonly: [null],
      drop_values: [null],
      sp: [null],
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
  onSubmit(){
    console.log(this.entryForm.value);
    this.dynamicservice.create(this.entryForm.value).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(["../all"], { relativeTo: this.route });
        if (data) {
          this.toastr.success('Added successfully');
              }
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
        if(error){
          this.toastr.error('Not Added Data Getting Some Error');
        }
      }
    );
  }
}
