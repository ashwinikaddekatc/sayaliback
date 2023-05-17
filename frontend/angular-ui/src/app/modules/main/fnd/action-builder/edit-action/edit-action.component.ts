import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Rn_Cff_ActionBuilder_Header } from 'src/app/models/builder/Rn_Cff_ActionBuilder_Header';
import { ValidationError } from 'src/app/models/fnd/ValidationError';
import { ActionBuilderService } from 'src/app/services/fnd/action-builder.service';
@Component({
  selector: 'app-edit-action',
  templateUrl: './edit-action.component.html',
  styleUrls: ['./edit-action.component.scss']
})
export class EditActionComponent implements OnInit {
  updated = false;
  actionBuilder_Header: Rn_Cff_ActionBuilder_Header;
  id: number;
  //projectId: number;

  fieldErors: ValidationError[] = []; // backend validation field error message
  tech_stacks = [
    'SpringMVC-Hibernate-Mysql',
    'Angular-SpringBoot-Mysql',
    'React-ReactNative-Mysql',
    'React-ReactNative-MongoDB',
    'Angular-SpringBoot-MongoDB',
    'Php-Laravel-Mysql',
    'MEAN'
  ];



  constructor( private router: Router,
    private route: ActivatedRoute,
    private actionBuilderService: ActionBuilderService) { }

  ngOnInit(): void {
    this.actionBuilder_Header = new Rn_Cff_ActionBuilder_Header();
    this.id = this.route.snapshot.params["id"];
    console.log("update with id = ", this.id);
    this.getById(this.id);
  }
  getById(id: number) {
    this.actionBuilderService.getById(id).subscribe(
      (data) => {
        console.log(data);
        this.actionBuilder_Header = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  update() {
    this.actionBuilderService.update(this.id, this.actionBuilder_Header).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(["../../all"], { relativeTo: this.route });
        //this.router.navigate(["../../all"],{ relativeTo: this.route, queryParams: { p_id: this.projectId } });
      },
      (error) => {
        console.log(error);
        const objectArray = Object.entries(error.error.fieldErrors);
        objectArray.forEach(([k, v]) => {
          console.log(k);
          console.log(v);
          this.fieldErors.push({ field: k, message: v });
        });
        console.log(this.fieldErors); // this will come from backend
      }
    );
    this.actionBuilder_Header = new Rn_Cff_ActionBuilder_Header();
  }

  onSubmit() {
    this.updated = true;
    this.update();
  }

  back() {
    this.router.navigate(["../../all"], { relativeTo: this.route });
  }
}
