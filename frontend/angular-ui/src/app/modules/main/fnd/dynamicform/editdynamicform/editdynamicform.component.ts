import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Rn_Forms_Component_Setup } from 'src/app/models/fnd/Rn_Forms_Component_Setup';
import { Rn_Forms_Setup } from 'src/app/models/fnd/Rn_Forms_Setup';
import { ValidationError } from 'src/app/models/fnd/ValidationError';
import { DynamicformService } from 'src/app/services/fnd/dynamicform.service';
import { Mapping } from "src/app/models/fnd/Mapping";
@Component({
  selector: 'app-editdynamicform',
  templateUrl: './editdynamicform.component.html',
  styleUrls: ['./editdynamicform.component.scss']
})
export class EditdynamicformComponent implements OnInit {
  updated = false;
  fieldErrors: ValidationError[] = [];
  rn_froms_setup: Rn_Forms_Setup;
  components: Rn_Forms_Component_Setup[];
  id: number;

  related_to = ["Menu", "Related To"];
  page_event = ["OnClick", "OnBlur"];
  field_type = [
    "textfield",
    "dropdown",
    "date",
    "checkbox",
    "textarea",
    "togglebutton",
  ];
  mappings: Mapping[];
  constructor(private router: Router,
    private route: ActivatedRoute,
    private dynamicservice:DynamicformService,
    private httpService: HttpClient) { }

  ngOnInit(): void {
    this.getMapings();
    this.rn_froms_setup = new Rn_Forms_Setup();
    this.id = this.route.snapshot.params["id"];
    console.log("update with id = ", this.id);
    this.getById(this.id);
  }
  getById(id: number) {
    this.dynamicservice.getById(id).subscribe((data) => {
      this.rn_froms_setup = data;
      this.components = data.components;
      console.log('component length = ', this.components.length.toString());

    });
  }
  update() {
    this.fieldErrors = [];
    this.dynamicservice.update(this.id, this.rn_froms_setup).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(["../../all"], { relativeTo: this.route });
      },
      (error: HttpErrorResponse) => {
        /* (error: HttpErrorResponse) => { */
        console.log(error);
        const objectArray = Object.entries(error.error.fieldErrors);
        objectArray.forEach(([k, v]) => {
          console.log(k);
          console.log(v);
          this.fieldErrors.push({ field: k, message: v });
        });
        console.log(this.fieldErrors); // this will come from backend
        this.rn_froms_setup = new Rn_Forms_Setup();

      }
    );
  }
  onSubmit() {
    this.updated = true;
    this.update();
  }
  getMapings() {
    this.httpService
      .get<Mapping[]>("./assets/json/form-setup-mapping.json")
      .subscribe(
        (data) => {
          console.log(data);
          this.mappings = data;
        },
        (err) => console.log(err)
      );
  }
  back() {
    this.router.navigate(["../../all"], { relativeTo: this.route });
  }
}
