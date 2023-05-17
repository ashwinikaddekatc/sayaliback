import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExcelService } from '../../../../services/excel.service';
import * as moment from 'moment';
import { BoardServiceService } from 'src/app/services/sureboard/board-service.service';
import{TypesService} from '../../../../services/sureboard/types.service';
import { ToastrService } from 'ngx-toastr';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-alltype',
  templateUrl: './alltype.component.html',
  styleUrls: ['./alltype.component.scss']
})
export class AlltypeComponent implements OnInit {
  rulesAdd;
  selected: any[] = [];
  ruleboard;
  loading = false;
  getallboardmodal=false;
  modaldelete=false;
  modaladd=false;
  modalAdd=false;
  modaledit=false;
  rowSelected :any= {};
  boarddata;
  boardId:number;
  public entryForm: FormGroup;
  constructor(private route:ActivatedRoute,
    private router: Router,
    private excel: ExcelService,
    private _board: BoardServiceService,
    private type:TypesService,
    private toastr: ToastrService,
    private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.boardId = +params['boardid'];
      console.log(this.boardId);

    });
    // this.entryForm = this._fb.group({
    //   name: [null],
    //   description: [null],

    //     });
        this.entryForm = this._fb.group({
          Sec_type: this._fb.array([this.initLinesForm()]),
        });
    this.getallboard();
  }
  initLinesForm() {
    return this._fb.group({
      name: [null],
      description: [null],

    })
  }
  get controls() {
    return (this.entryForm.get("Sec_type") as FormArray).controls;
  }
  onRemoveLines(index: number) {
    (<FormArray>this.entryForm.get("Sec_type")).removeAt(index);
  }
  onAddLines() {
    (<FormArray>this.entryForm.get("Sec_type")).push(this.initLinesForm());
  }
  onExport()
  {
    this.excel.exportAsExcelFile(this.ruleboard, 'user_',
    moment().format('YYYYMMDD_HHmmss'))
  }
  gotoedit(row){
    this.rowSelected = row;
    this.modaledit=true
    //this.router.navigate(["../editrule/"+id], { relativeTo: this.route });
  }
  onUpdate(id) {
    this.modaledit = false;
    console.log("id  ",id);
    console.log( this.rowSelected );
    this.type.update(id,this.rowSelected).subscribe((data) => {
        console.log(data);
      } );


}
  goToAdd()
  {
    this.modalAdd=true;
    //this.router.navigate(["../addrule"], { relativeTo: this.route,queryParams: { boardid: this.boardId } });
  }
  goToAddBoard()
  {this.modalAdd=true;
    //this.router.navigate(["../addruleboard"],{ relativeTo: this.route,queryParams: { boardid: this.boardId } });
  }
  getboard(){
    this.getallboardmodal=true;
    this._board.getAllBoards().subscribe((data)=>{
      this.boarddata=data;
      console.log(this.boarddata);
    })
   }
   allrule;
   getallboard(){
    this.type.getAll().subscribe((data)=>{
     this.allrule=data;
      console.log(this.allrule);
    })
   }
   deletemodal(row){
    this.rowSelected = row;
    this.modaldelete=true;
   }
   deleteboard(id:number){
    this.modaldelete = false;
    this.type.delete(id).subscribe((data)=>{
      console.log(data);
      this.ngOnInit();
      if (data) {
        this.toastr.success('Deleted successfully');
            }
    },(error) => {
      console.log('Error in adding data...',+error);
        if(error){
          this.toastr.error('Not deleted Data Getting Some Error');
        }
    });
   }
   onSubmit(){
    this.modalAdd=false;
    this.type.create(this.entryForm.getRawValue()['Sec_type']).subscribe((data)=>{
      console.log(data);
      this.ngOnInit();
      if (data) {
        this.toastr.success('Added successfully');
            }
    }, (error) => {
      console.log('Error in adding data...',+error);
        if(error){
          this.toastr.error('Not added Data Getting Some Error');
        }
    });
   }
}
