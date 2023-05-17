import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {SurepipeService} from '../../../../services/builder/surepipe.service';
@Component({
  selector: 'app-addpipe',
  templateUrl: './addpipe.component.html',
  styleUrls: ['./addpipe.component.scss']
})
export class AddpipeComponent implements OnInit {
  public entryForm: FormGroup;
  constructor(private _fb:FormBuilder,
    private surepipe:SurepipeService) { }

  ngOnInit(): void {
    this.entryForm = this._fb.group({
      projectid: [null],
      repoid: [null],
      templateid: [null],
     // workflow_instanceid:[null]
    });
  }
add(){
  this.surepipe.create(this.entryForm.value).subscribe((data)=>{
    console.log(data);
  })
}
}
