import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ValidationError } from "src/app/models/fnd/ValidationError";
import { ActionBuilderService } from "src/app/services/fnd/action-builder.service";
import { WireFrameList, WireframeService } from "src/app/services/builder/wireframe.service";
@Component({
  selector: 'app-add-action',
  templateUrl: './add-action.component.html',
  styleUrls: ['./add-action.component.scss']
})
export class AddActionComponent implements OnInit {
  public entryForm: FormGroup;
  submitted = false;
  basic: boolean = false;
  fieldError: ValidationError[] = []; // backend validation field error message
  projectId: number;

  nullValue = null;
  tech_stacks = [
    "SpringMVC-Hibernate-Mysql",
    "Angular-SpringBoot-Mysql",
    "React-ReactNative-Mysql",
    "React-ReactNative-MongoDB",
    "Angular-SpringBoot-MongoDB",
    "Php-Laravel-Mysql",
    "MEAN",
  ];

  constructor(private _fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private actionBuilderService: ActionBuilderService,
    private wireFrameServie: WireframeService,) { }

  ngOnInit(): void {
    this.getFbHeaderList();
    /* this.route.queryParams.subscribe((params) => {
      this.projectId = +params["p_id"];
    }); */
    this.entryForm = this._fb.group({
      rn_fb_header_id: [null], // get from dropdown
      technologyStack: [null],
      actionName: [null],
      controllerName: [null],
      methodName: [null],
      fileLocation: [null],
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
    this.fieldError = [];
    console.log("id value",this.entryForm.value.rn_fb_header_id);

    this.actionBuilderService
      .create(this.entryForm.value)
      .subscribe(
        (data) => {
          console.log(data);
          //this.router.navigate(["../all"], {relativeTo: this.route, queryParams: { p_id: this.projectId }});
          this.router.navigate(["../all"], {relativeTo: this.route});
        },
        (error) => {
          console.log(error);
          const objectArray = Object.entries(error.error.fieldErrors);
          objectArray.forEach(([k, v]) => {
            console.log(k);
            console.log(v);
            this.fieldError.push({ field: k, message: v });
          });
          console.log(this.fieldError); // this will come from backend
        }
      );
  }

  wireFrameDropDown: WireFrameList[];
  getFbHeaderList() {
    this.wireFrameServie.wireFrameDropDown().subscribe(data => {
      console.log('wireframe dropdown : ', data);
      this.wireFrameDropDown = data;
    }, err => {
      console.log(err);
    });
  }
}
