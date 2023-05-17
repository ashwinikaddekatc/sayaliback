import { Component, OnInit } from '@angular/core';
import { FormGroup , FormArray, FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { BoardruleService } from 'src/app/services/sureboard/boardrule.service';

@Component({
  selector: 'app-addrule-board',
  templateUrl: './addrule-board.component.html',
  styleUrls: ['./addrule-board.component.scss']
})
export class AddruleBoardComponent implements OnInit {

  public entryForm: FormGroup;

  fieldUpdate = ["Field Update","Stage Movement"];
  alertList = ["alert1","alert2"];
  subjects = ["English","Marathi"];

  selectedValue: string = '';

  updatedFieldOpt =["field1","field2"];
  toupdatedFieldOpt = ["show","show2"];
  intoOpt = ["value1","value2"];
  assigntoOpt = ["val","java"];
  boardId;
  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private boardrule:BoardruleService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    let id= this.route.snapshot.queryParams.id
    this.boardId= this.route.snapshot.queryParams.boardid
    //this.route.queryParams.subscribe(params => {
      //this.boardId = +params['boardid'];
      console.log(this.boardId);

   // });
    this.entryForm = this._fb.group({
      board_id:[this.boardId],
      rule_name:[null] ,
      description:[null] ,
      on_event:[null],
      updated_field:[null],
      updated_value:[null],
      to_updated_field:[null],
      to_updated_value:[null],
      in_to:[null],
      assign_to:[null],
      alert_to:[null],
      subject:[null],
      message:[null],
      });
  }
  goback(){
    this.router.navigate(["../sureboard-rules"], { relativeTo: this.route });
   }
addboard(){
  this.boardrule.createBoard(this.entryForm.value).subscribe((data)=>{
    console.log(data);

    if (data) {
      this.toastr.success('Added successfully');
          }
     this.router.navigate(["../sureboard-rules"], { relativeTo: this.route });
  },
  (error: any)=>{
    console.log('Error in adding data...',+error);
    if(error){
      this.toastr.error('Not added Data Getting Some Error');
    }
  });

}
}
