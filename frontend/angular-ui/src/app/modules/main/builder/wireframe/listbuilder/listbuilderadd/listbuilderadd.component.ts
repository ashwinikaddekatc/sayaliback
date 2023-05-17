import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TechnologyStackService } from 'src/app/services/builder/technology-stack.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { WireframeService } from 'src/app/services/builder/wireframe.service';
import { LinebuilderService } from 'src/app/services/builder/linebuilder.service';

@Component({
  selector: 'app-listbuilderadd',
  templateUrl: './listbuilderadd.component.html',
  styleUrls: ['./listbuilderadd.component.scss']
})
export class ListbuilderaddComponent implements OnInit {
  tech_stacks=[];
  moduleId;
  entryForm: FormGroup;
  constructor(private _fb: FormBuilder, private router: Router, private wireframeService: WireframeService,
    private route: ActivatedRoute,private toastr: ToastrService,private lineBuilder:LinebuilderService,
    private technologyStackService:TechnologyStackService) { }

  ngOnInit(): void {
    this.moduleId = this.wireframeService.getModuleId();
    console.log(this.moduleId);

    this.entryForm = this._fb.group({
      tech_Stack: [null],
      lb_name: [null],
      module_id: [null],
      description: [null],
      secuirity_profile:[null],
      menuName:[null],
      build:[null],
      updated:[null],
      lb_Line: this._fb.array([this.initLinesNullForm()]),
    });

    this.technologyStackService.getAll().subscribe((data)=>{
      console.log(data)
    this.tech_stacks=data;
  });

}

  initLinesNullForm() {
    return this._fb.group({
      model: ''
      //model:JSON.stringify(this.nodeField)
    });
  }

  onSubmit() {
    console.log("in add line  onsubmit");
    console.log(this.entryForm.value);
    // this.submitted = true;
    if (this.entryForm.invalid) {
      return;
    }
    this.onCreate();
  }

  onCreate() {
  //  console.log("in add wireframe  oncreate",this.formType,this.moduleId);

// this.entryForm.value.formType=this.formType;
this.entryForm.value.module_id=this.moduleId;
    this.lineBuilder.saveData(this.entryForm.value).subscribe(
        (data) => {
          console.log(data);
          if (data) {
            this.toastr.success('Added successfully');
         }
          this.router.navigate(["../all"], { relativeTo: this.route });
        },
        (error) => {
          console.log(error);

        }
      );

  }
  

}
