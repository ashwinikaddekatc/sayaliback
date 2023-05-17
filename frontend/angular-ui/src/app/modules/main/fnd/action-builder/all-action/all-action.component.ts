import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Rn_Cff_ActionBuilder_Header } from 'src/app/models/builder/Rn_Cff_ActionBuilder_Header';
import { ActionBuilderService } from 'src/app/services/fnd/action-builder.service';
@Component({
  selector: 'app-all-action',
  templateUrl: './all-action.component.html',
  styleUrls: ['./all-action.component.scss']
})
export class AllActionComponent implements OnInit {
  basic: boolean = false;
  columns: any[];
  rows: any[];
  temp = [];
  loading = false;
  selected: any[] = [];
  rowSelected :any= {};
  modaldelete=false;
  isLoading: boolean = false;
  actionBuilder_Header: Rn_Cff_ActionBuilder_Header[];
  constructor(private router: Router,
    private route: ActivatedRoute,
    private actionBuilderService: ActionBuilderService,) { }

  ngOnInit(): void {
    this.getAll();
  }
  getAll() {
    this.isLoading = true;
    this.actionBuilderService.getAll().subscribe((data) => {
      this.isLoading = false;
      console.log(data);
      this.actionBuilder_Header = data.items;
      this.rows = this.actionBuilder_Header;
      //this.temp = [...this.actionBuilder_Header];
    });
  }

  doFilter(event) {
    let val = event.target.value.toLowerCase();
    // filter our data
    let temp = this.temp.filter((d) => {
      return (
        d.actionName.toLowerCase().indexOf(val) !== -1 || !val ||
        d.controllerName.toLowerCase().indexOf(val) !== -1 || !val ||
        d.methodName.toLowerCase().indexOf(val) !== -1 || !val ||
        d.fileLocation.toLowerCase().indexOf(val) !== -1 || !val ||
        d.technologyStack.toLowerCase().indexOf(val) !== -1 || !val
      );
    });
    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    //this.table.offset = 0;
  }

  goToAdd() {
    this.router.navigate(["../adda"], { relativeTo: this.route });
  }
  goToReadOnly(id: number) {
    this.router.navigate(["../readonly/" + id], { relativeTo: this.route });
  }
  goToEdit(id: number) {
    this.router.navigate(["../edita/" + id], { relativeTo: this.route });
  }
  /* goToAdd() {
    this.router.navigate(["../add"], { relativeTo: this.route, queryParams: { p_id: this.projectId } });
  }
  goToReadOnly(id: number) {
    this.router.navigate(["../readonly/" + id], { relativeTo: this.route, queryParams: { p_id: this.projectId } });
  }
  goToEdit(id: number) {
    this.router.navigate(["../edit/" + id], { relativeTo: this.route,  queryParams: { p_id: this.projectId } });
  } */

  goToLines(id: number) {
    this.router.navigate(["../lines"], { relativeTo: this.route, queryParams: { headerId: id } });
  }
  onDelete(row) {
    this.rowSelected = row;
     this.modaldelete=true;
  }

  delete(id)
  {
  }
}
