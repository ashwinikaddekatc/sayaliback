import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ReportBuilderService } from 'src/app/services/api/report-builder.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ReportBuilder } from 'src/app/models/builder/ReportBuilder';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-rb-query-build',
  templateUrl: './rb-query-build.component.html',
  styleUrls: ['./rb-query-build.component.scss']
})
export class RbQueryBuildComponent implements OnInit {
  report_id:number;
  reportRegister:ReportBuilder;
  columns: any[];
  public entryForm: FormGroup;
  query2:string;
  rows:any[];
  constructor(private reportBuilderService: ReportBuilderService,
    private _fb: FormBuilder, private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.reportRegister = new ReportBuilder();
    this.route.queryParams.subscribe(params => {
      this.report_id = +params['report_id'];
    });
    this.entryForm = this._fb.group({
      sql_query: [null],
    });
  }
  onSubmit(){

    this.query2=this.entryForm.value.sql_query;
    console.log(this.query2);
    this.reportBuilderService.getMasterData(this.query2).subscribe((data) => {
      this.rows = data;
       var j;
       var cart = [];

     for(var i = 0; i < data.length; i++)
     {
       var columnsIn = data[i];
       if(i==1)
       {
           for(var key in columnsIn)
          {
           j={prop:key , name: key};
           cart.push(j)

          }
       }
     }
     this.columns = cart;

  });
}

alertType: string;
 alertMessage: string = "";
 alert = [
   { type: "success", message: "Save Successfully" },
   { type: "danger", message: "Not saved" }
 ];

onCreate() {
 console.log("Caling on create method");

 this.reportBuilderService.createQuery(this.report_id).subscribe(
   (data) => {
     this.alertMessage = this.alert[0].message;
    // console.log(data);
      // this.router.navigate(["../adhoc-param"], { relativeTo: this.route,queryParams: { report_id: this.report_id } });
   },
   (error) => {
         this.alertMessage = this.alert[1].message;
         console.log("Under error");
     });
   }


   onUpdate() {
     this.reportBuilderService.update(this.report_id, this.reportRegister).subscribe(
       (data) => {
         console.log(data);
         if(data){
          this.toastr.success("Saved Successfully");
         }
         //this.router.navigate(["../../all"], { relativeTo: this.route });
       },
       (error: HttpErrorResponse) => {
         console.log(error.message);
       }
     );
     this.reportRegister = new ReportBuilder();
   }

   select_query(){
     console.log("Calling select query:");
       this.entryForm.value.sql_query="abc";
   }

   query:String;
   clickFunction()
   {

     this.reportBuilderService.getMasterQuery(this.report_id).subscribe(
       (data) => {
         console.log(data);
         this.query=data.master_select;
        // $("textarea#sql_query").val(thients.query);
        // $("textarea#sql_query").attr('value',this.query);
        // $("textarea#sql_query").val(this.query);
       // $("#sql_query").text(this.query);
      // $("#sql_query").keyup(this.query);
      // $('#sql_query').html($(this.query).val());

    // $.trim($("textarea#sql_query").val("rutija"));
     // $.trim($("#comment").val());
     (<FormControl> this.entryForm.controls['sql_query']).setValue(this.query);


     },
       (error: HttpErrorResponse) => {
         console.log(error.message);
       }
     );

          // this.query="ganesh bute"


   }
}
