import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SureOpsscriptmasterService } from 'src/app/services/admin/sure-opsscriptmaster.service';
import { TechnologyStackService } from 'src/app/services/builder/technology-stack.service';

@Component({
  selector: 'app-sure-opsscriptedit',
  templateUrl: './sure-opsscriptedit.component.html',
  styleUrls: ['./sure-opsscriptedit.component.scss']
})
export class SureOpsscripteditComponent implements OnInit {
  id;
  data:any={};
  tech_stacks;
  constructor( private toastr:ToastrService, private route: ActivatedRoute,private technologyStackService: TechnologyStackService,
    private router : Router,private SureOpsscriptmasterService: SureOpsscriptmasterService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    console.log("update with id = ", this.id);
    this.getById(this.id);
    this.techstackdata();
  }
  getById(id:number)
  {
      this.SureOpsscriptmasterService.getById(id).subscribe((data)=>{
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
  techstackdata(){
    this.technologyStackService.getAll().subscribe((data)=>{
      console.log(data)
this.tech_stacks=data;
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
       this.SureOpsscriptmasterService.update(this.id,this.data).subscribe((data)=>{
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
