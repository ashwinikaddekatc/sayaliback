import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WireframeLineService } from 'src/app/services/builder/wireframe-line.service';
import { WireframeService } from 'src/app/services/builder/wireframe.service';
import { LinebuilderService } from 'src/app/services/builder/linebuilder.service';

@Component({
  selector: 'app-listbuilderall',
  templateUrl: './listbuilderall.component.html',
  styleUrls: ['./listbuilderall.component.scss']
})
export class ListbuilderallComponent implements OnInit {
  wireframeName;
  gridData;
  loading = false;
  error;
  selected: any[] = [];
  rowSelected :any= {};
  modaldelete=false;
  isLoading: boolean = false;
  projectId;
  moduleId;
  constructor(private router: Router,
    private route: ActivatedRoute, private _line: WireframeLineService, private wireframeService: WireframeService,
    private lineBuilder:LinebuilderService) { }

  ngOnInit(): void {
    this.projectId=this.wireframeService.getProjectId();
    console.log(this.projectId);
    this.moduleId = this.wireframeService.getModuleId(); // get from session storage
    console.log(this.moduleId);
    
    // this.getAll();
    this.getAllById();
  }

  getAll() {
    this.isLoading = true;
    this.lineBuilder.getDetails().subscribe((data) => {
      this.isLoading = false;
      console.log(data);
      this.gridData = data;
    });
  }
  getAllById() {
    this.lineBuilder.getModuleById(this.moduleId).subscribe((data) => {

      console.log("Get all by moduleid",data);
      this.gridData = data;
      if(this.gridData.length == 0){
        this.error="No data Available";
        console.log(this.error);
      }

    });
  }


  goToAdd() {
    this.router.navigate(["../addl"], { relativeTo: this.route });
  }

  goToEdit(id: number) {
    this.router.navigate(["../editl/" + id], { relativeTo: this.route });
  }
  goToLines(id: number) {
    this.router.navigate(["../lines"], { relativeTo: this.route, queryParams: { headerId: id } });
  }
  onDelete(row) {
    this.rowSelected = row;
     this.modaldelete=true;
  }
  delete(id){
    this.modaldelete = false;
    this.lineBuilder.deleteById(id).subscribe((data) => {
      console.log(data);
     this.ngOnInit();
    },(error) => {
      console.log(error);
    })
  }
}