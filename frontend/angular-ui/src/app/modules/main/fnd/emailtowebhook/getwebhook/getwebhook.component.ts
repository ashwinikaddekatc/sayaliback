import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { NewwebhookService } from 'src/app/services/fnd/newwebhook.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-getwebhook',
  templateUrl: './getwebhook.component.html',
  styleUrls: ['./getwebhook.component.scss']
})
export class GetwebhookComponent implements OnInit {

  loading = false;
  error;
  selected: any[] = [];
  rowSelected :any= {};
  modaldelete=false;
  data;

  constructor(private router: Router, private route:ActivatedRoute, private newweb:NewwebhookService, private toastr:ToastrService) { }

  ngOnInit(): void {

    this.getall();



  }

  getall(){
    this.newweb.getAll().subscribe((data)=>{
      console.log(data);
      this.data=data;
      if(data.length == 0){
        this.error="No data Available";
      }
      if(data.operationMessage =='Your Access is Denied Plz contact Admin'){
        this.toastr.error('Your Not Authorized To Access This Endpoint plz Contact Admin');

       }

     // this.projectsetup = data.items;
     // this.projectname=data.projectname;
    },(error) => {
      console.log(error);
      if(error){
       this.error="No data Available OR server Error";
     }
    });
  }

  goToAdd(){
    this.router.navigate(["../add"], { relativeTo: this.route });

  }

  goToEdit(id) {
    this.router.navigate(["../edit/" + id], { relativeTo: this.route });
  }

  onDelete(row) {
    this.rowSelected = row;
     this.modaldelete=true;
  }

  delete(id:number){
    this.modaldelete = false;
    this.newweb.deleteById(id).subscribe((data)=>{
      console.log(data);
      if(data){
        this.toastr.success("Data deleted Successfully");
      }
      this.getall();
    },(error)=>{
      if(error.status == 200){
        console.log(error);
        this.toastr.success("Data deleted Successfully");
        this.getall();
      }
      if(error.status == 404){
        console.log(error);
        this.toastr.error("error in deleting data")
      }
    });
  }

}
