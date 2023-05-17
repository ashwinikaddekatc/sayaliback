import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DynamicTransactionService } from 'src/app/services/fnd/dynamic-transaction.service';
import { DynamicformService } from 'src/app/services/fnd/dynamicform.service';

@Component({
  selector: 'app-adddynamicform1',
  templateUrl: './adddynamicform1.component.html',
  styleUrls: ['./adddynamicform1.component.scss']
})
export class Adddynamicform1Component implements OnInit {
  public entryForm: FormGroup;
  form_id: number;
  form_name: string;
  uiData: any[];
  formdesc;
  button;
  constructor( private _fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private dynamicservice:DynamicformService,
    private dynamictservice:DynamicTransactionService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const userId = params['form_id'];
      this.form_id = userId;
      console.log(userId);
      this.getUIData(userId);
    });
    this.entryForm = this._fb.group({
      form_id: [this.form_id], // shoud come from param
      form_version: [null],
      comp1: [null],
      comp2: [null],
      comp3: [null],
      comp4: [null],
      comp5: [null],
      comp6: [null],
      comp7: [null],
      comp8: [null],
      comp9: [null],
      comp10: [null],
      comp11: [null],
      comp12: [null],
      comp13: [null],
      comp14: [null],
      comp15: [null],
      comp16: [null],
      comp17: [null],
      comp18: [null],
      comp19: [null],
      comp20: [null],
      comp21: [null],
      comp22: [null],
      comp23: [null],
      comp24: [null],
      comp25: [null],
      comp_l26: [null],
      comp_l27: [null],
      comp_l28: [null],
      comp_l29: [null],
      comp_l30: [null],

      //components: this._fb.array([this.initLinesForm()]),
    });
  }
  getUIData(id: number) {
    this.dynamicservice.getById(id).subscribe(data => {
      console.log('add-dynamic form data ', data);
      this.uiData = data.components;
      this.form_name = data.form_name;
      this.formdesc= data.form_desc;
      this.button=data.button_caption;

    }, err => console.log(err)
    );
  }
  onSubmit(){
    console.log(this.entryForm.value);
    this.dynamictservice.create(this.entryForm.value).subscribe(
      (data) => {
        this.router.navigate(["../all"], { relativeTo: this.route, queryParams: { form_id: this.form_id } });
        if (data) {
          this.toastr.success('Added successfully');
              }
      },
      (error) => { console.log(error);
        if(error){
          this.toastr.error('Not Added Data Getting Some Error');
        } }
    );
  }
}
