import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportBuilderService } from 'src/app/services/api/report-builder.service';
import { ReportBuilder } from 'src/app/models/builder/ReportBuilder';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-editreport2',
  templateUrl: './editreport2.component.html',
  styleUrls: ['./editreport2.component.scss']
})
export class Editreport2Component implements OnInit {

  id:number;
  project:ReportBuilder;
  entryForm: FormGroup;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private reportBuilderService: ReportBuilderService,
    private _fb: FormBuilder) { }
    list=["Rn_Cff_ActionBuilder_Service","Rn_Cff_ActionBuilderRules_Service","Rn_Dashboard_Header_Service","Rn_dashboard_widget_service","Rn_Bcf_Exception_Rule_Library_Service","Rn_Bcf_Extractor_Params_Service",
    "Rn_Bcf_Extractor_Service","Rn_Bcf_Rule_Library_Service","Rn_Bcf_TechnologyStack_Service","Rn_Instructor_Service","StudentService","TeacherService","FieldTypeService","Rn_FLF_Service","ExtFieldService","Rn_DynamicTransactionService","Rn_Forms_Setup_Service","Rn_Function_Register_Service",
    "Rn_LookUp_Service","Rn_Main_Menu_Service","Rn_Menu_Group_Service","Rn_Menu_Register_Service","Rn_ModuleSetup_Service","Rn_ProjectSetup_Service","Rn_CreateQuery_Service","Rn_report_builder_service","CompanyService","RoleService","UserService","Rn_WireFrame_Service"];

  ngOnInit(): void {
    this.project=new ReportBuilder();
    this.id = this.route.snapshot.params["id"];
    this.entryForm = this._fb.group({
      report_name: [null],
      description: [null],
      report_tags: [null],
   });
   this.getById(this.id);
  }
  getById(id: number) {
    this.reportBuilderService.getById(id).subscribe(
      (data) => {
        this.project = data;
        console.log("reportdata",data );

      },
      (err) => {
        console.log(err);
      }
    );
  }


  updatereport()
  {


    this.reportBuilderService.updateservicereport(this.id,this.project).subscribe((data)=>{
      console.log("updated report data ", data);

    });
    this.router.navigate(["/cns-portal/entity-report"] );
  }

  back()
  {
    this.router.navigate(["/cns-portal/entity-report"] );
  }



  buildReport(){
    console.log("id in build report:",this.id);
    console.log("in a build report" , this.project);
    this.reportBuilderService.report2(this.project).subscribe((data)=>{
      console.log(data);

    })

  }
  onSubmit(){}
}
