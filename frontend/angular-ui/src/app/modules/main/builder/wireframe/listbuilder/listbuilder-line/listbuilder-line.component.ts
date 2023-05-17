import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LinebuilderService } from 'src/app/services/builder/linebuilder.service';
import { WireframeLineService } from 'src/app/services/builder/wireframe-line.service';
import { WireframeService } from 'src/app/services/builder/wireframe.service';

@Component({
  selector: 'app-listbuilder-line',
  templateUrl: './listbuilder-line.component.html',
  styleUrls: ['./listbuilder-line.component.scss']
})
export class ListbuilderLineComponent implements OnInit {
  updated = false;
  lineBuilder_Header;
  wireframeName;
  wireframeColName;
  id: number;
  headerId;
  projectId
  selectedTable;

  nodeEditProperties = {
    id : '',
    header_id:'',
    type: '',
};
  constructor(private router: Router,private wireframeLineService: WireframeLineService,
    private route: ActivatedRoute,private listBuilder:LinebuilderService,private wireframeService:WireframeService) { }

  ngOnInit(): void {
    // this.id = this.route.snapshot.params["id"];
    // console.log("update with id = ", this.id);
    this.route.queryParams.subscribe(params => {
      this.headerId = +params['headerId'];
    });

    this.projectId=this.wireframeService.getProjectId();
    this.getById(this.headerId)
    this.getallwireframe();
  }

  getById(id: number) {
    this.listBuilder.getDetailsById(id).subscribe(
      (data) => {
        console.log(data);
        this.lineBuilder_Header = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getallwireframe(){
    this.wireframeLineService.getAllwireframes(this.projectId).subscribe((data)=>{
      console.log(data);
      let dataW = data.map((option: string) => option.replace(/"/g, '')); // Remove the double quotes from each option
      this.wireframeName = dataW;
    },(error)=>{
      if(error){
        console.log(error);
      }
    });
  }

  tableName(val){
    console.log(val);
    // this.selectedTable = val;
    this.getcolumn(val);
  }

  getcolumn(tablename){
    this.wireframeLineService.getColumnList(this.projectId,tablename).subscribe((data)=>{
      console.log(data);
      // let dataW = data.map((option: string) => option.replace(/"/g, '')); // Remove the double quotes from each option
      this.wireframeColName = data;
    },(error)=>{
      if(error){
        console.log(error);
      }
    });
  }

  update() {
    this.listBuilder.updateHeader(this.lineBuilder_Header).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(["../../all"], { relativeTo: this.route });
        //this.router.navigate(["../../all"],{ relativeTo: this.route, queryParams: { p_id: this.projectId } });
      },
      (error) => {
        
        console.log(error); 
      }
    );
  }

  onSubmit() {
    this.updated = true;
    this.update();
  }

}
