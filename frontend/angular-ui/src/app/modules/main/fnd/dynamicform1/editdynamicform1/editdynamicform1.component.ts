import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DynamicForm } from 'src/app/models/fnd/DynamicForm';
import { DynamicTransactionService } from 'src/app/services/fnd/dynamic-transaction.service';
import { DynamicformService } from 'src/app/services/fnd/dynamicform.service';

@Component({
  selector: 'app-editdynamicform1',
  templateUrl: './editdynamicform1.component.html',
  styleUrls: ['./editdynamicform1.component.scss']
})
export class Editdynamicform1Component implements OnInit {
  dynamicForm: DynamicForm;

  id: number;
  form_id: number;
  //uiData: any[];
  form_name: string;
  componentsData: any[];
  formdesc;
  button;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private dynamicservice:DynamicformService,
    private dynamictservice:DynamicTransactionService,) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const userId = params['form_id'];
      this.form_id = userId;
      console.log(userId);
    });
    this.dynamicForm = new DynamicForm();
    this.id = this.route.snapshot.params["id"];
    console.log("update with id = ", this.id);
    this.getComponentsData(this.form_id);
    this.getByIdAndFormId(this.id, this.form_id);
  }
// FOR UI
getComponentsData(id: number) {
  this.dynamicservice.getById(id).subscribe(data => {
    console.log('edit-dynamic-form components data: ', data);
    this.componentsData = data.components;
    this.form_name = data.form_name;
    this.formdesc= data.form_desc;
      this.button=data.button_caption;
  }, err => console.log(err)
  );
}

// GET THE DATA
getByIdAndFormId(id: number, form_id: number) {
  this.dynamictservice.getByIdAndFormId(id, form_id).subscribe((data) => {
    console.log(data);
    this.dynamicForm = data;
    /* // working yes
     const keys = this.componentsData.map((item, i) => {
      const container = { label: '', type: '', value: ''};
      container.label = item.label;
      container.type = item.type;
      container.value = this.dynamicForm[item.mapping];
        return container;
      });
    console.log(keys);
    this.uiData = keys; */
  }, err => {
      return console.log(err);
    }
  );
}
update() {
  this.dynamictservice.updateByIdAndFormId(this.id,this.form_id, this.dynamicForm).subscribe(
    (data) => {
      console.log(data);
      this.router.navigate(["../../all"], { relativeTo: this.route, queryParams: { form_id: this.form_id } });
      if (data) {
        this.toastr.success('Updated successfully');
            }
    },
    (error: HttpErrorResponse) => {
      console.log(error.message);
      if(error){
        this.toastr.error('Not Updated Data Getting Some Error');
      }
    }
  );
  this.dynamicForm = new DynamicForm();
}
}
