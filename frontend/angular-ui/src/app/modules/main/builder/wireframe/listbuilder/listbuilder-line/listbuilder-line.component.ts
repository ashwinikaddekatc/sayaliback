import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LinebuilderService } from 'src/app/services/builder/linebuilder.service';
import { WireframeLineService } from 'src/app/services/builder/wireframe-line.service';
import { WireframeService } from 'src/app/services/builder/wireframe.service';

@Component({
  selector: 'app-listbuilder-line',
  templateUrl: './listbuilder-line.component.html',
  styleUrls: ['./listbuilder-line.component.scss']
})
export class ListbuilderLineComponent implements OnInit {
  public entryForm: FormGroup;
  updated = false;
  lineBuilder_Header;
  builderLine;
  builderLineData:any[] = [];
  wireframeName;
  wireframeColName;
  id: number;
  headerId;
  projectId
  lineId;
  selectedTable:any[];
  SelectedColumn:any[];
  nodeEditProperties = {
    id : '',
    header_id:'',
    type: '',
};
  constructor(private router: Router,private wireframeLineService: WireframeLineService, private toastr:ToastrService,
    private route: ActivatedRoute,private listBuilder:LinebuilderService,private wireframeService:WireframeService,
    private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.headerId = +params['headerId'];
    });

    this.entryForm = this._fb.group({
      SelectedColumn : [null],
      selectedTable:[null],
      });

    this.projectId=this.wireframeService.getProjectId();
    this.getById(this.headerId)
    this.getallwireframe();
    // this.SelectedColumn = [];
  }

  getById(id: number) {
    this.listBuilder.getDetailsById(id).subscribe(
      (data) => {
        console.log(data);
        this.lineBuilder_Header = data;

        this.builderLine = this.lineBuilder_Header.lb_Line;
        this.lineId = this.builderLine.id;
        console.log("line data ",this.builderLine);
        if(this.builderLine[0].model != '')
        {
          this.builderLineData = JSON.parse(this.builderLine[0].model) ;
          console.log(this.builderLineData);
        }
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
  listBuilder_Lines = {
    model:{}
  }
  UpdateLine(){
    console.log('update button clicked.......');
    console.log(this.builderLineData);
    let tmp = JSON.stringify(this.builderLineData); //.replace(/\\/g, '')
    this.listBuilder_Lines.model = tmp;
console.log(this.listBuilder_Lines);
    this.listBuilder.updateLineById(this.headerId,this.listBuilder_Lines).subscribe((data)=>{
      console.log('Updation Successful...');
      console.log(data);
      //this.ngOnInit();
      this.router.navigate(["../all"], { relativeTo: this.route });
        if (data) {
          this.toastr.success('Updated successfully');
        }
    },
    (error: any)=>{
        console.log(error);
        if (error) {
          this.toastr.error('Not Updated getting errror');
        }
    });
  }

  onSubmit() {
    this.updated = true;
    this.builderLineData.push(this.entryForm.value);
    this.UpdateLine();
    
  }

}