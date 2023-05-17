import { Component, OnInit } from '@angular/core';
import { FormGroup , FormArray, FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-addrule-sureboard',
  templateUrl: './addrule-sureboard.component.html',
  styleUrls: ['./addrule-sureboard.component.scss']
})
export class AddruleSureboardComponent implements OnInit {

  public entryForm: FormGroup;

  fieldUpdate = ["Field Update","Stage Movement"];
  alertList = ["alert1","alert2"];
  subjects = ["English","Marathi"];

  selectedValue: string = '';

  updatedFieldOpt =["field1","field2"];
  toupdatedFieldOpt = ["show","show2"];
  intoOpt = ["value1","value2"];
  assigntoOpt = ["val","java"];

  constructor(private _fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {

    this.entryForm = this._fb.group({

      rulename:[null] ,
      description:[null] ,
      onfields:[null],
      updatefield:[null],
      updateValue:[null],
      toupdatefield:[null],
      toupdateValue:[null],
      into:[null],
      assignto:[null],
      alertto:[null],
      subject:[null],
      msgbody:[null],
      });
  }
  goback(){
    this.router.navigate(["../sureboard-rules"], { relativeTo: this.route });
  }

  onSubmit()
  {

  }

}
