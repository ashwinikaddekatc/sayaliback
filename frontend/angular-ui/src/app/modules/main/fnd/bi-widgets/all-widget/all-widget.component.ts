import { Component, OnInit } from '@angular/core';
import { BiWidget } from 'src/app/models/fnd/BiWidget';
import { ActivatedRoute, Router } from '@angular/router';
import { BiWidgetSetupService } from 'src/app/services/fnd/bi-widget-setup.service';
@Component({
  selector: 'app-all-widget',
  templateUrl: './all-widget.component.html',
  styleUrls: ['./all-widget.component.scss']
})
export class AllWidgetComponent implements OnInit {
  moduleId: number;
  columns: any[];
  rows: any[];
  temp = [];
  isLoading: boolean = false;
  widget: BiWidget[];
  loading = false;
  selected: any[] = [];
  rowSelected :any= {};
  modaldelete=false;
  constructor(private widgetService: BiWidgetSetupService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.moduleId = this.widgetService.getModuleId(); // get from session storage
    console.log(this.moduleId);

    this.getModuleReport(this.moduleId);
    this.columns = [
        { prop: "id", name: "Actions"},
        { prop: "widget_name", name: "Widget Name" },
        { prop: "widget_description", name: "Widget Description" },
        { prop: "chart_type", name: "Chart Type" },
        { prop: "sql_query", name: "Sql Query" },
        { prop: "label", name: "Label" },
        { prop: "color_scheme", name: "Color Scheme" }
      ];
  }
  getModuleReport(id: number) {
    this.isLoading = true;
    //this.moduleService.getById(id).subscribe((data) => {
      this.widgetService.getAll(id).subscribe((data) => {
      this.isLoading = false;
      console.log(data);
      //this.wireFrames = data.rn_fb_headers;
      this.widget = data.items;
     this.rows = this.widget;
      //this.temp = [...this.widget];
    });
  }

  goToAdd() {
    //this.router.navigate(["../add"], { relativeTo: this.route });
    this.router.navigate(["../add-widget"], { relativeTo: this.route });
  }
  goToEdit(id)
  {

    this.router.navigate(["../edit-widget/"+id], { relativeTo: this.route });
  }
  onDelete(row) {
    this.rowSelected = row;
     this.modaldelete=true;
  }

  delete(id)
  {
    this.modaldelete = false;
    console.log("in delete  "+id);


  }

}
