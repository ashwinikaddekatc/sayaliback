import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkflowDataService } from 'src/app/services/fnd/workflow-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-workflow',
  templateUrl: './update-workflow.component.html',
  styleUrls: ['./update-workflow.component.scss']
})
export class UpdateWorkflowComponent implements OnInit {
  workflowdata:any[]=[];
  workflowLine:any;
  workflowmodal:boolean = false;
  public entryForm: FormGroup;
  public nodeEntryForm: FormGroup;
  toggleNodeForm:boolean;

  hideme = {};
  type:any;
  updateId;
  id:any;
  modelid:number ;
  processType:any;
  workflow_data;

  nodeEditProperties = {
    id : '',
    type: '',
    title : '',
    description: '',
    script : '',
    variables : '',
    active:'',
    status:'',
    a_uri:'',
    b_uri:'',
    uri:'',
    filepath:'',
    filetype:'',
    name:'',
    sequence:'',
    file:'',
    action:'',
    destination:'',
    ifcondition:'',
    connectionname:'',
    else1:'',
    else2:'',
    else3:'',
    workflow:'',
    requestbody:''
};
isUser:boolean = true;
workflowname;
  constructor( private workflowservice:WorkflowDataService,
    private router : Router,
    private route: ActivatedRoute,
    private _fb: FormBuilder,
    private toastr:ToastrService,
    private workflowserive:WorkflowDataService,) { }

  ngOnInit(): void {
    this.entryForm = this._fb.group({
      title : [null],
      type:[null],
      id:[null],
      //nodeid: this._fb.array([this.initLinesForm()]),
      });

      this.workflowserive.getAll().subscribe((data)=>{
        console.log("workflow list ",data);
        this.workflow_data = data;
      });

    this.nodeEntryForm = this._fb.group({

      title:[null],
      description:[null],
      script:[null],
      variables:[null],
      active:[true],
      status:[null],
      a_uri:[null],
      b_uri:[null],
      uri:[null],
      filepath:[null],
      filetype:[null],
      sequence:[null],
      file:[null],
      action:[null],
      name:[null],
      destination:[null],
      ifcondition:[null],
      else1:[null],
      else2:[null],
      else3:[null],
      workflow:[null],
      connectionname:[null],
      requestbody:[null],
    });

    this.updateId = this.route.snapshot.params["id"];
    console.log("update with id = ", this.updateId);
    this.getData(this.updateId);
  }
  getData(id:number)
  {
    this.workflowservice.getById(id).subscribe((data)=>{
      console.log("Data By id ",data);
      this.workflowname=data.workflow_name;
      this.workflowLine = data.workflow_Lines;
      console.log("workflow line ",this.workflowLine);
      if(this.workflowLine[0].model != '')
      {
        console.log("if condition");
        this.workflowdata = JSON.parse(this.workflowLine[0].model) ;
      }
      console.log(typeof this.workflowLine[0].model);
      console.log("id ",this.workflowLine[0].id);
      this.id = data.workflow_Lines[0].id;
      console.log("this.id ",this.id);
     // this.workflowdata = this.workflowLine[0].model;
      console.log(typeof this.workflowdata);
      console.log("model data ",this.workflowdata);
    },
    (error)=>{
      console.log(error);
    });
  }


  toggleForm(data)
  {
    //document.getElementById
    this.toggleNodeForm = !this.toggleNodeForm;
    console.log(data);
    this.modelid = data.id;
    this.processType = data.type;
      console.log(this.modelid);
      this.nodeEditProperties = data;

  }

  onClick(item) {
    console.log(item);
    Object.keys(this.hideme).forEach(h => {
      this.hideme[h] = false;
    });
    this.hideme[item.id] = true;
    this.modelid = item.id;
    this.processType = item.type;
    this.nodeEditProperties = item;
  }
  delNode(id)
  {
      console.log(this.workflowdata);
      this.workflowdata = this.workflowdata.filter(item => item.id !== id);
      console.log("After Delete Array ",this.workflowdata);
      Object.keys(this.hideme).forEach(h => {
        this.hideme[h] = false;
      });
  }

  closeForm()
  {
    this.toggleNodeForm = false;
    Object.keys(this.hideme).forEach(h => {
      this.hideme[h] = false;
    });
  }

  workflowmodalOPen(type)
  {
    console.log("static type  ",type);
    let typeno = type;
    switch (typeno) {
      case 1:
        this.type = "Initialize" ;
          break;
      case 2:
        this.type = "Script" ;
          break;
      case 3:
        this.type = "Create File" ;
          break;
      case 4:
        this.type = "Create File2" ;
          break;
      case 5:
        this.type = "Decision Box" ;
          break;
      case 6:
        this.type = "Workflow" ;
        break;
      case 7:
          this.type = "Run Script" ;
          break;
      case 8:
          this.type = "Delete Files" ;
          break;
      case 9:
          this.type = "TEST" ;
          break;
    }

      this.workflowmodal = true;
  }
  onSubmit()
  {
    this.entryForm.value.title=this.entryForm.value.type;
    console.log("addWorkflowDb data");
    console.log(this.entryForm.value);

    this.workflowdata.push(this.entryForm.value);
    this.entryForm.reset();
    //this.workflowdata.push(this.entryForm.value);
    console.log(this.workflowdata);
    this.workflowmodal = false;
   // this.ngOnInit();
   this.workflowdata.sort(
    (n1,n2)=>{
      // if (n1.id>n2.id) return 1;
       //if (n1.id<n2.id) return -1;
       //else return 0;
       return n1.id-n2.id;
   })
   console.log(this.workflowdata);
  }

  nodeAdd(id)
  {
      console.log("Node Add method");
      console.log(this.nodeEntryForm.value);
      console.log(id);

      let formdata = this.entryForm.value;
    let num = id;

      this.workflowdata = this.workflowdata.map(item => {
      if(item.chartid == num)
        {
        //item["product_id"] = "thisistest";
        const xyz = {...item,...formdata}
        console.log(xyz);
        return xyz;
        }
        return item
        });
      console.log(this.workflowdata);

  }

  workflow_Lines = {
    model:''
  }
  UpdateLine()
  {
    console.log('update button clicked.......');
    console.log(this.workflowdata);
    let tmp = JSON.stringify(this.workflowdata);
    console.log("temp data",typeof tmp);
    console.log(tmp);
    this.workflow_Lines.model = tmp;

    this.workflowservice.updateLineById(this.id,this.workflow_Lines).subscribe((data)=>{
      console.log('Updation Successful...');
      console.log(data);
      //this.ngOnInit();
      this.router.navigate(["../../all"], { relativeTo: this.route });
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
  workflowmod(val){
    console.log(val);
    this.selectedworkflowid=val
  }
  selectedworkflowid;
  openvmodal(){
    if( this.selectedworkflowid==undefined){
      alert("Plz First Select Workflow Value So You Can Navigate");
return false;
    }else{
      this.router.navigate(['../../edit/'+this.selectedworkflowid],{relativeTo:this.route});
    }

  }
  change(val){
    console.log(val);
  }
  onCheckChange(val){
    this.entryForm.value.active!=val;
  //this.entryForm.value.microservice=false;

     }
}
