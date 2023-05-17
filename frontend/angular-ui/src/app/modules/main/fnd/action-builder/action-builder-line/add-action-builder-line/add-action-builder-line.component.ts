import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidationError } from 'src/app/models/fnd/ValidationError';
import { ActionBuilderService } from 'src/app/services/fnd/action-builder.service';
@Component({
  selector: 'app-add-action-builder-line',
  templateUrl: './add-action-builder-line.component.html',
  styleUrls: ['./add-action-builder-line.component.scss']
})
export class AddActionBuilderLineComponent implements OnInit {
  public entryForm: FormGroup;
  submitted = false;
  basic: boolean = false;
  fieldError: ValidationError[] = []; // backend validation field error message
  headerId: number;
  actionTypes1: any[] = [
    {key: "comment", value: "comment"},
    {key: "log", value: "log"},
    {key: "variable", value: "variable"},
    {key: "operation", value: "operation"},
    {key: "for loop", value: "forloop"},
    {key: "if", value: "if"},
    {key: "else", value: "else"},
    {key: "else if", value: "else-if"},
    {key: "while", value: "while"},
    {key: "while operation", value: "while-op"},
    {key: "while forward", value: "while-fwd"},
    {key: "do", value: "do"},
    {key: "do forward", value: "do-fwd"},
    {key: "list", value: "list"},
    {key: "map", value: "map"},
    {key: "set", value: "set"},
    {key: "model", value: "model"},
    {key: "dao", value: "dao"},
    {key: "service", value: "service"},
    {key: "update a table", value: "update-table"},

    {key: "inset into a table", value: "insert-table"},
    {key: "string replace", value: "string-replace"},
    {key: "append string", value: "string-append"},

  ];

  actionTypes2 = [
    {key: "log in console", value: "console"},
    {key: "open brace", value: "open"},
    {key: "condition", value: "condition"},
    {key: "close brace", value: "close"},
    {key: "API", value: "api"},
    {key: "jdbc template", value: "jdbc-template"},
    {key: "sql statement", value: "sql-stmt"},
    {key: "string replace in a file", value: "file"},
    {key: "string append in a variable", value: "variable"},
    {key: "string replace in a variable", value: "variable"},
    {key: "string append in a file", value: "file"},
  ]
  constructor(private _fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private actionBuilderService: ActionBuilderService,) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.headerId = +params['headerId'];
    });
    this.entryForm = this._fb.group({

      actionType1: [null],
      actionType2: [null],
      dataType: [null],
      variableName: [null],
      assignment: [null],
      message: [null],
      conditions: [null],
      forward: [null],
      equation: [null],
      seq: [null],
      action: [null]
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
    this.actionBuilderService.createLine(this.entryForm.value, this.headerId).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(["../all"],{ relativeTo: this.route, queryParams: { headerId: this.headerId } });
      },
      (error) => {
        console.log(error);
        const objectArray = Object.entries(error.error.fieldErrors);
        objectArray.forEach(([k, v]) => {
          console.log(k);
          console.log(v);
          this.fieldError.push({ field: k, message: v });
        });
        console.log(this.fieldError);
        console.log("helloe");
         // this will come from backend
      }
    );
  }
}
