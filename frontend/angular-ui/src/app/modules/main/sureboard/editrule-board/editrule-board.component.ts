import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BoardruleService } from 'src/app/services/sureboard/boardrule.service';

@Component({
  selector: 'app-editrule-board',
  templateUrl: './editrule-board.component.html',
  styleUrls: ['./editrule-board.component.scss']
})
export class EditruleBoardComponent implements OnInit {
  public entryForm: FormGroup;

  fieldUpdate = ["Field Update","Stage Movement"];
  alertList = ["alert1","alert2"];
  subjects = ["English","Marathi"];

  selectedValue: string = '';

  updatedFieldOpt =["field1","field2"];
  toupdatedFieldOpt = ["show","show2"];
  intoOpt = ["value1","value2"];
  assigntoOpt = ["val","java"];
  id:number;
  alldata:any={};
  constructor(private _fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private boardrule:BoardruleService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    console.log("update with id = ", this.id);
    this.getById(this.id);

  }
  getById(id:any){
    this.boardrule.getOneBoard(id).subscribe((data)=>{
      this.alldata=data;
      console.log(this.alldata);
    })
  }
  goback(){
    this.router.navigate(["../sureboard-rules"], { relativeTo: this.route });
  }

  onupdate() {
this.boardrule.update(this.id,this.alldata).subscribe((data)=>{
  console.log(data);
  this.router.navigate(["../../sureboard-rules"], { relativeTo: this.route });
  if (data) {
    this.toastr.success('Updated successfully');
        }
},
(error: any)=>{
  console.log('Error in adding data...',+error);
  if(error){
    this.toastr.error('Not added Data Getting Some Error');
  }
}
);


}
}
