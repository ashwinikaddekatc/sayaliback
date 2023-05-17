import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WebpageBuilderService } from 'src/app/services/builder/webpage-builder.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {

  pageEditId;
  data:any={};

  constructor(
    private webservice:WebpageBuilderService,
    private route:ActivatedRoute,
    private router:Router,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {

    this.pageEditId = this.route.snapshot.params.id;
    console.log(this.pageEditId);
    this.webservice.getById(this.pageEditId).subscribe(data=>{
      console.log("page data to edit ",data);
      this.data = data;
    },
    (error)=>{
      console.log(error);
    });
  }

  onSubmit()
  {
    console.log("Update data");
    console.log(this.pageEditId,this.data);
    this.webservice.UpdateRowData(this.pageEditId,this.data).subscribe(data=>{
      console.log("data upadted sucessfully ",data);
      this.router.navigate(["../../all"], { relativeTo: this.route });
      if (data) {
        this.toastr.success('Updated successfully');
      }
    },
    (error)=>{
      console.log(error);
      if(error){
        this.toastr.error('Data Not Updated Getting Some Error');
      }
    });

  }

}
