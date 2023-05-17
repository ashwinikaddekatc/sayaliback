import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WebpageBuilderService } from 'src/app/services/builder/webpage-builder.service';
import { WireframeService } from 'src/app/services/builder/wireframe.service';

@Component({
  selector: 'app-addwebpage',
  templateUrl: './addwebpage.component.html',
  styleUrls: ['./addwebpage.component.scss']
})
export class AddwebpageComponent implements OnInit {

  public entryForm: FormGroup;
  submitted = false;
  moduleId:any;
  jsonString:any;


  fieldModels=
    {

      "dashboard": [
             {
            "cols": 30,
            "rows": 20,
            "x": 0,
            "y": 0,
            "name": "Text area",
            "component": "Text area",
            "chartid":2
            }
          ]
  }



  wfline = {
    model: 'this.fieldModels'
  }
  constructor( private _fb:FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr : ToastrService,
    private webpageservice : WebpageBuilderService,
    private wireframeService :WireframeService) { }

  ngOnInit(): void {
    this.moduleId = this.wireframeService.getModuleId();
    console.log(this.moduleId);

      this.entryForm = this._fb.group({
        report_builder_name : [null],
        description: [null],
        secuirity_profile : [null],
        page_size : [null],
        module_id:[null],

        rp_Line: this._fb.array([this.initLinesForm()]),
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

    this.webpageservice.create(this.entryForm.value).subscribe((data)=>{
      console.log(data);
      this.router.navigate(["../all"],{relativeTo:this.route});
      if(data)
      {
        this.toastr.success('Added successfully');
      }
    },
    (error) => {
      console.log(error);
      if(error)
      {
        this.toastr.success('Record Not Added successfully');
      }
    }
    );

  }

}
