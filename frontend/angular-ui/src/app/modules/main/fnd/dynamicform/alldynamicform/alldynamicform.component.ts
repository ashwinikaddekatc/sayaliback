import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {DynamicformService} from '../../../../../services/fnd/dynamicform.service'
@Component({
  selector: 'app-alldynamicform',
  templateUrl: './alldynamicform.component.html',
  styleUrls: ['./alldynamicform.component.scss']
})
export class AlldynamicformComponent implements OnInit {
  rowSelected :any= {};
  modaldelete=false;
  loading = false;
  data;
  error;
  selected: any[] = [];
  constructor(private dynamicservice:DynamicformService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getall();
  }
  getall(){
this.dynamicservice.getAll().subscribe((data)=>{
  this.data=data.items;
  console.log(data);
  if(data.length==0){
    this.error="No data Available plz add if Required";
    console.log(this.error)
  }
},(error) => {
  console.log(error);
  if(error){
   this.error="Server Error";
 }
})
  }
  goToAdd(){
    this.router.navigate(["../add"], { relativeTo: this.route });
  }
  goToEdit(id: number) {
    this.router.navigate(["../edit/" + id], {relativeTo: this.route });
}
  goToForm(id: number) {
    this.router.navigate(['/cns-portal/dynamicform1'], {queryParams: { form_id: id } });

}
form_id;
alertType: string;
    alertMessage: string = "";
    alert = [
      { type: "success", message: "Build Successfully" },
      { type: "danger", message: "Some error Happens" },
    ];
buildDynamicForm(id) {
  this.form_id=id;
  console.log("buildDynamicForm() Form_id = " + this.form_id);
  if (this.form_id === null) {
      this.alertType = this.alert[1].type;
      this.alertMessage = "form_code is null";
      return;
  }
  this.dynamicservice.buildDynamicForm(this.form_id).subscribe(data => {
      console.log("Success Message: ", data);
      this.alertType = this.alert[0].type;
      this.alertMessage = this.alert[0].message;
  }, (err) => {
      console.log("Error Message ", err);
      this.alertType = this.alert[1].type;
      this.alertMessage = this.alert[1].message;
  });

}
onDelete(row) {
  this.rowSelected = row;
   this.modaldelete=true;
}
delete(id){
  this.modaldelete = false;
  console.log("in delete  "+id);
  this.dynamicservice.delete(id).subscribe((data) => {
      console.log(data);
      this.ngOnInit();
      if (data.body) {
        this.toastr.success('Deleted successfully');
            }
    },(error) => {
      console.log('Error in adding data...',+error);
      if(error){
        this.toastr.error('Not Deleted Data Getting Some Error');
      }
    }  );
    }
}
