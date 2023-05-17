import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WireframeService } from 'src/app/services/builder/wireframe.service';
import { Dashboard3Service } from '../../../../../services/builder/dashboard3.service';
@Component({
  selector: 'app-addnewdash',
  templateUrl: './addnewdash.component.html',
  styleUrls: ['./addnewdash.component.scss']
})
export class AddnewdashComponent implements OnInit {
  public entryForm: FormGroup;
  submitted = false;
  moduleId:any;
  jsonString:any;

  // fieldModels=
  //   {
  //   "dashboards": [
  //     {
  //       "dashboard": [
  //         {
  //           "cols": 3,
  //           "rows": 3,
  //           "x": 0,
  //           "y": 0,
  //           "name": "Radar Chart",
  //           "component": "Radar Chart"
  //         }
  //       ]
  //     }
  //   ]
  // }
  fieldModels=
    {

      "dashboard": [
             {
            "cols": 4,
            "rows": 5,
            "x": 0,
            "y": 0,
            "name": "Radar Chart",
            "component": "Radar Chart"

            }
          ]
  }



  wfline = {
    model: 'this.fieldModels'
  }
  constructor( private _fb:FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dashboardService : Dashboard3Service,
    private toastr : ToastrService,
    private wireframeService :WireframeService) { }

  ngOnInit(): void {
    this.moduleId = this.wireframeService.getModuleId();
    console.log(this.moduleId);

      this.entryForm = this._fb.group({
        dashboard_name : [null],
        description: [null],
        secuirity_profile : [null],
        module_id:[null],

        dashbord1_Line: this._fb.array([this.initLinesForm()]),
      // dashbord1_Line: this.fieldModels
      });
  }
  initLinesForm() {
    return this._fb.group({

      model:JSON.stringify(this.fieldModels)
    });
  }

  onSubmit() {
    console.log("In onSubmit method");
    console.log(this.entryForm.value);
    if(this.entryForm.invalid)
    {
      return;
    }
    this.onCreate()

  }

  onCreate()
  {
    console.log("in oncreate method");
    this.entryForm.value.module_id=this.moduleId;

    console.log(typeof this.fieldModels)
   // this.jsonString = JSON.stringify(this.fieldModels);
  // this.entryForm.value.dashbord1_Line.model=JSON.stringify(this.fieldModels);
    //onsole.log(this.entryForm.value.dashbord1_Line.model);
    //this.entryForm.value.dashbord1_Line.header_id = 2;
    //console.log(this.jsonString);
    //console.log(typeof this.jsonString)

    this.dashboardService.create(this.entryForm.value).subscribe((data)=>{
      console.log(data);
      this.router.navigate(["../all"],{relativeTo:this.route});
    },
    (error) => {
      console.log(error);
    }
    );
    if(this.entryForm.value)
    {
      this.toastr.success('Added successfully');
    }
  }

}
