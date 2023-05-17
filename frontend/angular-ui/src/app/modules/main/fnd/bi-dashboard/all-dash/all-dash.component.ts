import { Component, OnInit } from '@angular/core';
import { BiDashHeader } from 'src/app/models/fnd/BiDashHeader';
import { ActivatedRoute, Router } from '@angular/router';
import { BiDashSetupService } from 'src/app/services/fnd/bi-dash-setup.service';
@Component({
  selector: 'app-all-dash',
  templateUrl: './all-dash.component.html',
  styleUrls: ['./all-dash.component.scss']
})
export class AllDashComponent implements OnInit {
  moduleId: number;
  columns: any[];
  rows: any[];
  temp = [];
  isLoading: boolean = false;
  biDash: BiDashHeader[];
  loading = false;
  selected: any[] = [];
  rowSelected :any= {};
  modaldelete=false;
  constructor(private dashService: BiDashSetupService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.moduleId = this.dashService.getModuleId(); // get from session storage
    this.getDashboardDetails(this.moduleId);
    this.columns = [
        { prop: "header_id", name: "Actions"},
        { prop: "dashboard_name", name: "Dashboard Name"}
      ];
  }
  getDashboardDetails(id: number) {
    this.isLoading = true;
      this.dashService.getAll(id).subscribe((data) => {
        console.log(data);

      this.isLoading = false;
      this.biDash = data.items;
      this.rows = this.biDash;
      // this.temp = [...this.biDash];
    });
  }

  goToAdd() {
    //this.router.navigate(["../add"], { relativeTo: this.route });
    this.router.navigate(["../add-dash"], { relativeTo: this.route });
  }
  goToReadOnly(id)
  {
    // this.router.navigate(["../edit-dash/" + id], {relativeTo: this.route });
  }

  goToEdit(id: number) {
    console.log("edit id",id);

    this.router.navigate(["../edit-dash/" + id], {relativeTo: this.route });
}

goToWidDash(id:number)
{
  //this.router.navigate(["../widget-dash/" + id], {relativeTo: this.route });
  this.router.navigate(["../test_19"], {relativeTo: this.route });

}
}
