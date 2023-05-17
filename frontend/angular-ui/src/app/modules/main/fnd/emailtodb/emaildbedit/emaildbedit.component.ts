import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Webhookservicesui1Service } from 'src/app/services/fnd/webhookservicesui1.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-emaildbedit',
  templateUrl: './emaildbedit.component.html',
  styleUrls: ['./emaildbedit.component.scss']
})
export class emaildbeditComponent implements OnInit {
  id;
  dbData;
  constructor(private router:Router, private route:ActivatedRoute,
    private toastr:ToastrService,private dbService:Webhookservicesui1Service){


  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    console.log("update with id = ", this.id);
    this.getById(this.id);
  }
  getById(id){
    this.dbService.getDetailsById(id).subscribe((data)=>{
      console.log(data);
      this.dbData = data;
    });
  }

  onSubmit(){
    this.dbService.updateData(this.id, this.dbData).subscribe((data)=>{
      console.log(data);
      if(data){
        this.toastr.success("Update Successfully");
      }
      this.router.navigate(["../../all"], { relativeTo: this.route });
    },(error)=>{
      if(error.status == 200){
        console.log(error);
        this.toastr.success("Data Update Successfully");
        this.router.navigate(["../../all"], { relativeTo: this.route });
      }
      if(error.status == 404){
        console.log(error);
        this.toastr.error("error in Update data")
        this.router.navigate(["../../all"], { relativeTo: this.route });
      }
    });
  }

  goback(){

    this.router.navigate(["../../all"], { relativeTo: this.route });
  }

}
