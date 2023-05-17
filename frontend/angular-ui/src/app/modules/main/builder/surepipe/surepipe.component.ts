import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SureopsService } from 'src/app/services/builder/sureops.service';
import {SurepipeService} from '../../../../services/builder/surepipe.service';
@Component({
  selector: 'app-surepipe',
  templateUrl: './surepipe.component.html',
  styleUrls: ['./surepipe.component.scss']
})
export class SurepipeComponent implements OnInit {
  rowSelected:any={};
  modaldelete:boolean=false;
  loading:boolean=false;
  college:any;
  alldata;
  alldata1;
  projectId;
  error;
  pdata;
  constructor(private router: Router,private toastr:ToastrService,
    private route: ActivatedRoute, private suropsService:SureopsService,
    private surepipe:SurepipeService) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.projectId = +params['pid'];
      console.log("Project ID ",this.projectId);
    });
    this.getbyproid(this.projectId);
    this.getData();
  }
  // getdata(){
  //   this.surepipe.getall().subscribe((data)=>{
  //     this.alldata=data;
  //     console.log(this.alldata);
  //   })
  // }
  getbyproid(id){
    this.suropsService.getbysurepipeproid(id).subscribe((data)=>{
      console.log(data);
      this.pdata=data;
      if(this.pdata.length==0){
        this.error="No data Available";
        console.log(this.error)
      }
    }, (error: HttpErrorResponse)=>{
      console.log(error);
      if(error.status===400){
        this.toastr.error(error.error);
      }
      if(error.status===200){
        this.pdata=JSON.parse(error.error.text);
        console.log(this.pdata);
        //this.toastr.error(error.error);
      }
      if(error){
        this.error="No data Available";
      }
   });
  }
  getData() {
    this.surepipe.getall().subscribe((data) => {
      console.log(data);
      this.alldata = data;



    });
  }
  onExport(){}
  goToAdd(){
    this.router.navigate(["../addpipe" ], { relativeTo: this.route });
  }
  goToEdit(id:number) {
    console.log(id);
    this.router.navigate(["../surepipeedit/" + id ], { relativeTo: this.route });
  }
  onDelete(id){
this.surepipe.delete(id).subscribe((data)=>{
  console.log(data);
})
  }
}
