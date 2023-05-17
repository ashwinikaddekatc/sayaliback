import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExtensionField } from 'src/app/models/fnd/ExtensionField';
import { ExtensionService } from 'src/app/services/fnd/extension.service';

interface Rows {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
@Component({
  selector: 'app-editextension',
  templateUrl: './editextension.component.html',
  styleUrls: ['./editextension.component.scss']
})
export class EditextensionComponent implements OnInit {
  types:string[] = ['header', 'line'];
  lookup_values: string[] = []; // come from server
  lookups: string[] =[
    'extn1', 'extn2', 'extn3', 'extn4', 'extn5',
    'extn6', 'extn7', 'extn8', 'extn9', 'extn10',
    'extn11', 'extn12', 'extn13', 'extn14', 'extn15'
    ];
  datatype_values: string[] = []; // come from server
  datatypes: string[] = ['textfield', 'longtext', 'date', 'checkbox', 'radiobutton', 'autocomplete'];


  updated = false;
  extensionField: ExtensionField;
  id: number;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private extensionService: ExtensionService) { }

  ngOnInit(): void {
    this.extensionField = new ExtensionField();
    this.id = this.route.snapshot.params["id"];
    console.log("update with id = ", this.id);
    this.getById(this.id);
  }
  getById(id: number) {
    this.extensionService.getById(id).subscribe((data) => {
      console.log(data);
      this.extensionField = data;
    });
  }
  update() {
    this.extensionService.update(this.id, this.extensionField).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(["../../all"], { relativeTo: this.route });
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  onSubmit() {
    this.updated = true;
    this.update();
  }

  back() {
    this.router.navigate(["../../all"], { relativeTo: this.route });
  }
}
