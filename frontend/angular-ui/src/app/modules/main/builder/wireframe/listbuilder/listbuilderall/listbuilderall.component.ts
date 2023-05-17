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
  selected: any[] = [];
  rowSelected :any= {};
  modaldelete=false;
  isLoading: boolean = false;
  projectId;
  constructor(private router: Router,
    private route: ActivatedRoute, private _line: WireframeLineService, private wireframeService: WireframeService,
    private lineBuilder:LinebuilderService) { }

  ngOnInit(): void {
    this.projectId=this.wireframeService.getProjectId();
    console.log(this.projectId);
    
    this.getAll();
    this.getallwireframe();
  }

  getAll() {
    this.isLoading = true;
    this.lineBuilder.getDetails().subscribe((data) => {
      this.isLoading = false;
      console.log(data);
      this.gridData = data;
    });
  }

  
  getallwireframe(){
    this._line.getAllwireframes(this.projectId).subscribe((data)=>{
      console.log(data);
      let dataW = data.map((option: string) => option.replace(/"/g, '')); // Remove the double quotes from each option
      this.wireframeName = dataW;
    },(error)=>{
      if(error){
        console.log(error);
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
