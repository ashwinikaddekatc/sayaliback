import { Component, OnInit } from '@angular/core';
import { ValidationError } from 'src/app/models/fnd/ValidationError';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ReportBuilderService } from 'src/app/services/api/report-builder.service';
import { Router, ActivatedRoute } from '@angular/router';
import { id } from '@cds/core/internal';

@Component({
  selector: 'app-addreport2',
  templateUrl: './addreport2.component.html',
  styleUrls: ['./addreport2.component.scss']
})
export class Addreport2Component implements OnInit {
  entryForm: FormGroup;
  report;
  id:number;
  submitted = false;
  basic: boolean = false;
  fieldErrors: ValidationError[] = []; // backend validation field error message
  moduleId: number;
  formType: string;
  report_id:number;
  list=["Rn_Cff_ActionBuilder_Service","Rn_Cff_ActionBuilderRules_Service","Rn_Dashboard_Header_Service","Rn_dashboard_widget_service","Rn_Bcf_Exception_Rule_Library_Service","Rn_Bcf_Extractor_Params_Service",
"Rn_Bcf_Extractor_Service","Rn_Bcf_Rule_Library_Service","Rn_Bcf_TechnologyStack_Service","Rn_Instructor_Service","StudentService","TeacherService","FieldTypeService","Rn_FLF_Service","ExtFieldService","Rn_DynamicTransactionService","Rn_Forms_Setup_Service","Rn_Function_Register_Service",
"Rn_LookUp_Service","Rn_Main_Menu_Service","Rn_Menu_Group_Service","Rn_Menu_Register_Service","Rn_ModuleSetup_Service","Rn_ProjectSetup_Service","Rn_CreateQuery_Service","Rn_report_builder_service","CompanyService","RoleService","UserService","Rn_WireFrame_Service"];

  constructor( private reportBuilderService: ReportBuilderService,
    private _fb: FormBuilder,
    private router: Router,) { }

  ngOnInit(): void {
    this.moduleId = this.reportBuilderService.getModuleId();
    this.report_id=200;
    console.log(this.moduleId);
    this.entryForm = this._fb.group({
      report_name: [null],
      description: [null],
      report_tags: [null],
      servicename: [null]

   });
  }
  onSubmit() {
    console.log(this.entryForm.value);
    this.submitted = true;
    if (this.entryForm.invalid) {
      return;
    }
    this.onCreate();
  }


  onCreate() {
    this.fieldErrors = [];
    console.log("Report name::",this.entryForm.value.report_name);
    console.log("service name::",this.entryForm.value.servicename);
    this.reportBuilderService
      .createservicereport(this.entryForm.value, this.moduleId)
      .subscribe(
        (data) => {
          // console.log(data);
          console.log("Geting id::",data);
          this.report=data;
          this.id=this.report.id;
          this.router.navigate(["/cns-portal/entity-report"] );

          //this.router.navigate(["../all"],{ relativeTo: this.route, queryParams: { p_id: this.projectId } });
          // this.router.navigate(["../all"], { relativeTo: this.route});
        },
        (error) => {
          console.log(error);
          const objectArray = Object.entries(error.error.fieldErrors);
          objectArray.forEach(([k, v]) => {
            console.log(k);
            console.log(v);
            this.fieldErrors.push({ field: k, message: v });
          });
          console.log(this.fieldErrors); // this will come from backend
        }
      );
  }
}
