import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Rn_Cff_ActionBuilder_Line } from "src/app/models/builder/Rn_Cff_ActionBuilder_Line";
import { ValidationError } from "src/app/models/fnd/ValidationError";
import { ActionBuilderService } from "src/app/services/fnd/action-builder.service";
@Component({
  selector: 'app-edit-action-builder-line',
  templateUrl: './edit-action-builder-line.component.html',
  styleUrls: ['./edit-action-builder-line.component.scss']
})
export class EditActionBuilderLineComponent implements OnInit {
  updated = false;
  actionBuilder_Line: Rn_Cff_ActionBuilder_Line;
  id: number;
  headerId: number;

  fieldErors: ValidationError[] = []; // backend validation field error message

  actionTypes1: any[] = [
    { key: "comment", value: "comment" },
    { key: "log", value: "log" },
    { key: "variable", value: "variable" },
    { key: "operation", value: "operation" },
    { key: "for loop", value: "forloop" },
    { key: "if", value: "if" },
    { key: "else", value: "else" },
    { key: "else if", value: "else-if" },
    { key: "while", value: "while" },
    { key: "while operation", value: "while-op" },
    { key: "while forward", value: "while-fwd" },
    { key: "do", value: "do" },
    { key: "do forward", value: "do-fwd" },
    { key: "list", value: "list" },
    { key: "map", value: "map" },
    { key: "set", value: "set" },
    { key: "model", value: "model" },
    { key: "dao", value: "dao" },
    { key: "service", value: "service" },
    { key: "update a table", value: "update-table" },

    { key: "inset into a table", value: "insert-table" },
    { key: "string replace", value: "string-replace" },
    { key: "append string", value: "string-append" },
  ];

  actionTypes2 = [
    { key: "log in console", value: "console" },
    { key: "open brace", value: "open" },
    { key: "condition", value: "condition" },
    { key: "close brace", value: "close" },
    { key: "jdbc template", value: "jdbc-template" },
    { key: "sql statement", value: "sql-stmt" },
    { key: "string replace in a file", value: "file" },
    { key: "string append in a variable", value: "variable" },
    { key: "string replace in a variable", value: "variable" },
    { key: "string append in a file", value: "file" },
  ];

  constructor( private router: Router,
    private route: ActivatedRoute,
    private actionBuilderService: ActionBuilderService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.route.queryParams.subscribe((params) => {
      this.headerId = +params["headerId"];
      console.log(this.headerId);
    });

    this.actionBuilder_Line = new Rn_Cff_ActionBuilder_Line();
    console.log("update with id = ", this.id);
    this.getById(this.headerId);
  }
  getById(id: number) {
    this.actionBuilderService.getLineById(id).subscribe(
      (data) => {
        this.actionBuilder_Line = data;
        console.log(this.actionBuilder_Line);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  update() {
    this.actionBuilderService
      .updateLine(this.headerId, this.actionBuilder_Line)
      .subscribe(
        (data) => {
          console.log(data);
          //this.router.navigate(["../../all"], { relativeTo: this.route });
          this.router.navigate(["../../all"], {
            relativeTo: this.route,
            queryParams: { headerId: this.headerId },
          });
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
    this.actionBuilder_Line = new Rn_Cff_ActionBuilder_Line();
  }

  onSubmit() {
    this.updated = true;
    this.update();
  }

  back() {
    this.router.navigate(["../../all"], { relativeTo: this.route });
  }
}
