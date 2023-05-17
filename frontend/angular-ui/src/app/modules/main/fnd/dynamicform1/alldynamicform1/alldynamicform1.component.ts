import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicTransactionService } from 'src/app/services/fnd/dynamic-transaction.service';
import { DynamicformService } from 'src/app/services/fnd/dynamicform.service';

interface Column {
  prop: string,
  name: string,
  width: number,
  cellTemplate?: any
}
@Component({
  selector: 'app-alldynamicform1',
  templateUrl: './alldynamicform1.component.html',
  styleUrls: ['./alldynamicform1.component.scss']
})
export class Alldynamicform1Component implements OnInit {
  rowSelected :any= {};
  modaldelete=false;
  loading = false;
  data;
  error;
  selected: any[] = [];
  uiData: any[];
  form_id: number;
  columns: Column[] = [];
  dynamicForm;
  isLoading;
  rows;
  constructor( private router: Router,
    private route: ActivatedRoute,
    private dynamicservice:DynamicformService,
    private dynamictservice:DynamicTransactionService,) { }

  ngOnInit(): void {
    // get data from params
    this.route.queryParams.subscribe(params => {
      this.form_id = +params['form_id'];
    });
    console.log('form_id ', this.form_id);
    this.getData(this.form_id);
    console.log('columns = ', this.columns);
  }
  getData(id: number) {
    this.isLoading = true;
    // table column names
    this.getColumnsWithData(id);
    this.dynamictservice.getByFormId(id).subscribe((data) => {
      this.isLoading = false;
      console.log('DYNAMIC TABLE DATA: ', data);
      this.dynamicForm = data;
      this.rows = this.dynamicForm;
      if(data.length ==0){
        this.error="plz add data";
      }
//this.data=data;
    },(error) => {
      console.log(error);
      if(error){
       this.error="No data Available";
     }
    });
  }
  getColumnsWithData(id: number) {
    // ui data
    this.dynamicservice.getById(id).subscribe((data) => {
      this.uiData = data.components;
      //console.log('ui data: ', this.uiData);
      const keys = this.uiData.map((item) => {
        const container = {prop: '', name: '', width: 120};
        container.prop = item.mapping;
        container.name = item.label.toUpperCase();
          return container;
        });
        //this.columns.push({ prop: "id", name: "Actions", width: 65, cellTemplate: this.fieldById });
        //console.log(keys);
        for(let key of keys) {
          this.columns.push(key);
        }
      }, (err) => {
        console.log(err)
      }
    );
  }
  goToAdd(){
    this.router.navigate(["../add"], { relativeTo: this.route, queryParams: { form_id: this.form_id } });
  }
  goToEdit(id: number) {
    this.router.navigate(["../edit/" + id], { relativeTo: this.route,  queryParams: { form_id: this.form_id }  });
  }
  onDelete(row) {
    this.rowSelected = row;
     this.modaldelete=true;
  }
  delete(id){
    this.modaldelete = false;
    console.log("in delete  "+id);
    this.dynamictservice.delete(id).subscribe((data) => {
        console.log(data);
        this.ngOnInit();
      },);
      }
}
