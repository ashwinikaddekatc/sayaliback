import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-connector-mapping',
  templateUrl: './connector-mapping.component.html',
  styleUrls: ['./connector-mapping.component.scss']
})
export class ConnectorMappingComponent implements OnInit {

  getFields = ['log configuration','workflow','NSCO','Job Log','headerLines'];

  postFields = ['log configuration','workflow','NSCO','Job Log','headerLines'];

  getcolfields:boolean = false;
  public entryForm: FormGroup;

  constructor(private _fb:FormBuilder,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.entryForm = this._fb.group({
      getapi : [null],
      connectorName: [null],
      postapi : [null],
      fieldname:[null],
      null:[null],
    });
  }

  reloadgetFields()
  {
      console.log(this.entryForm.value.getapi);
      this.getcolfields = true;
  }
  reloadPostApi()
  {
    console.log(this.entryForm.value.postapi);
  }
  onSubmit()
  {
    console.log("onSubmit Method");
    console.log(this.entryForm.value);
  }
}
