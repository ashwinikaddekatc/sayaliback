import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExcelService } from '../../../../services/excel.service';
import * as moment from 'moment';
import { BoardServiceService } from 'src/app/services/sureboard/board-service.service';
import{BoardruleService} from '../../../../services/sureboard/boardrule.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-sureboard-rule',
  templateUrl: './sureboard-rule.component.html',
  styleUrls: ['./sureboard-rule.component.scss']
})
export class SureboardRuleComponent implements OnInit {

  rulesAdd;
  selected: any[] = [];
  ruleboard;
  loading = false;
  getallboardmodal=false;
  modaldelete=false;
  rowSelected :any= {};S
  boarddata;
  boardId:number;
  constructor(
    private route:ActivatedRoute,
    private router: Router,
    private excel: ExcelService,
    private _board: BoardServiceService,
    private boardrule:BoardruleService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.boardId = +params['boardid'];
      console.log(this.boardId);

    });
    this.getallboard();

  }
  onExport()
  {
    this.excel.exportAsExcelFile(this.ruleboard, 'user_',
    moment().format('YYYYMMDD_HHmmss'))
  }
  gotoedit(id:number){
    this.router.navigate(["../editrule/"+id], { relativeTo: this.route });
  }
  goToAdd()
  {
    this.router.navigate(["../addrule"], { relativeTo: this.route,queryParams: { boardid: this.boardId } });
  }
  goToAddBoard()
  {
    this.router.navigate(["../addruleboard"],{ relativeTo: this.route,queryParams: { boardid: this.boardId } });
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
    this.boardrule.getAllBoards().subscribe((data)=>{
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
    this.boardrule.deleteBoard(id).subscribe((data)=>{
      console.log(data);
      this.ngOnInit();
      if (data) {
        this.toastr.success('Deleted successfully');
            }
    });


   }
}
