import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Rn_Cff_ActionBuilder_Line } from 'src/app/models/builder/Rn_Cff_ActionBuilder_Line';
import { AlertService } from 'src/app/services/alert.service';
import { ActionBuilderService } from 'src/app/services/fnd/action-builder.service';
@Component({
  selector: 'app-all-action-builder-line',
  templateUrl: './all-action-builder-line.component.html',
  styleUrls: ['./all-action-builder-line.component.scss']
})
export class AllActionBuilderLineComponent implements OnInit {
  basic: boolean = false;
  columns: any[];
  rows: any[];
  temp = [];
  isLoading: boolean = false;
  actionBuilder_Lines: Rn_Cff_ActionBuilder_Line[];
  headerId: number;
  loading = false;
  selected: any[] = [];
  rowSelected :any= {};
  modaldelete=false;

  constructor(private ref: ChangeDetectorRef,
    private _fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private actionBuilderService: ActionBuilderService,
    private alertService: AlertService,) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.headerId = +params['headerId'];
    });
    //this.initCopyRuleForm();
    this.getActionBuilderLines(this.headerId);
  }
  getActionBuilderLines(headerId: number) {
    this.isLoading = true;
    this.actionBuilderService.getLinesByHeaderId(headerId).subscribe((data) => {
      this.isLoading = false;
      console.log(data);
      this.actionBuilder_Lines = data.items;
      this.rows = this.actionBuilder_Lines;
      //this.temp = [...this.actionBuilder_Lines];
    });
  }

  doFilter(event) {
    let val = event.target.value.toLowerCase();
    // filter our data
    let temp = this.temp.filter((d) => {
      return (
        d.actionType1.toLowerCase().indexOf(val) !== -1 || !val ||
        d.actionType2.toLowerCase().indexOf(val) !== -1 || !val ||
        d.dataType.toLowerCase().indexOf(val) !== -1 || !val ||
        d.variableName.toLowerCase().indexOf(val) !== -1 || !val ||
        d.assignment.toLowerCase().indexOf(val) !== -1 || !val ||
        d.message.toLowerCase().indexOf(val) !== -1 || !val ||
        d.conditions.toLowerCase().indexOf(val) !== -1 || !val ||
        d.forward.toLowerCase().indexOf(val) !== -1 || !val ||
        d.equation.toLowerCase().indexOf(val) !== -1 || !val ||
        d.seq.toLowerCase().indexOf(val) !== -1 || !val ||
        d.action.toLowerCase().indexOf(val) !== -1 || !val
      );
    });
    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    //this.table.offset = 0;
  }

/*   goToAdd() {
    this.router.navigate(["../add"], { relativeTo: this.route });
  }
  goToReadOnly(id: number) {
    this.router.navigate(["../readonly/" + id], { relativeTo: this.route });
  }
  goToEdit(id: number) {
    this.router.navigate(["../edit/" + id], { relativeTo: this.route });
  } */
  goToAdd() {
    this.router.navigate(["../add"], { relativeTo: this.route, queryParams: { headerId: this.headerId } });
  }
  goToReadOnly(id: number) {
    this.router.navigate(["../readonly/" + id], { relativeTo: this.route, queryParams: { headerId: this.headerId } });
  }
  goToEdit(id: number) {
    this.router.navigate(["../edit/" + id], { relativeTo: this.route,  queryParams: { headerId: this.headerId } });
  }

  // ========= build layout and data ===========//
  // buildLayOut() {
  //   this.actionBuilderService.cffLayOut(this.headerId).subscribe(res => {
  //     console.log(res);
  //   }, (err) => {
  //     console.log(err);
  //   });
  // }
  // buildData() {
  //   this.actionBuilderService.cffData(this.headerId).subscribe(res => {
  //     console.log(res);
  //   }, (err) => {
  //     console.log(err);
  //   });
  // }

  buildAction() {
    this.actionBuilderService.cffData(this.headerId).subscribe(res => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  }

  toggleStatus(id: any, value: any) {
    console.log("id : ", id, " value : ", value);
    this.actionBuilderService.setActive(id).subscribe(
      (data) => {
        console.log(data);
        //this.getData();
        this.ref.detectChanges();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
