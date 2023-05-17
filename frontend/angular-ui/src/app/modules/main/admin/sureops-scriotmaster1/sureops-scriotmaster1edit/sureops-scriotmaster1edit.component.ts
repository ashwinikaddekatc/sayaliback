import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SureOpsscriptmasterService } from 'src/app/services/admin/sure-opsscriptmaster.service';

@Component({
  selector: 'app-sureops-scriotmaster1edit',
  templateUrl: './sureops-scriotmaster1edit.component.html',
  styleUrls: ['./sureops-scriotmaster1edit.component.scss']
})
export class SureopsScriotmaster1editComponent implements OnInit {
  id;
  data:any={};
  constructor(private toastr:ToastrService, private route: ActivatedRoute,
    private router : Router,private SureOpsscriptmasterService: SureOpsscriptmasterService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    console.log("update with id = ", this.id);
    this.getById(this.id);
  }
  getById(id:number)
  {
      this.SureOpsscriptmasterService.getById1(id).subscribe((data)=>{
        console.log("Data By id ",data);
        this.data = data;
       // this.arrayTag = JSON.parse(data.tags);
       // console.log("this.arrayTag ",this.arrayTag);
        //this.categoryarray=JSON.parse(data.app_category);
      },
      (error)=>{
        console.log(error);
      });
  }
  onSubmit() {
    // this.updated = true;
     this.update();
   }

   update()
   {
       console.log(this.id,this.data);
      // this.data.tags = JSON.stringify(this.arrayTag);
       this.SureOpsscriptmasterService.update1(this.id,this.data).subscribe((data)=>{
         console.log(data);
         this.router.navigate(["../../all"], { relativeTo: this.route });
         if (data) {
           this.toastr.success('Updated successfully');
         }
       },
       (error) => {
         console.log('Error in adding data...',+error);
           if(error){
             this.toastr.error('Data Not Updated Getting Some Error');
           }
       });

   }
}
