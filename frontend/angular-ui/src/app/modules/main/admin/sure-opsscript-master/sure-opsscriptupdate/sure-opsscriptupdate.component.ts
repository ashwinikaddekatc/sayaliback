import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {SureOpsscriptmasterService} from '../../../../../services/admin/sure-opsscriptmaster.service'

@Component({
  selector: 'app-sure-opsscriptupdate',
  templateUrl: './sure-opsscriptupdate.component.html',
  styleUrls: ['./sure-opsscriptupdate.component.scss']
})
export class SureOpsscriptupdateComponent implements OnInit {
  updateId;
  hideme = {};
  type:any;
  modelid:number ;
  processType:any;
  workflowmodal:boolean = false;
  workflowdata:any[]=[];
  toggleNodeForm:boolean;
  public entryForm: FormGroup;
  public nodeEntryForm: FormGroup;

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
    sequence:'',
    file:'',
    action:'',
    destination:'',
    ifcondition:'',
    else1:'',
    else2:'',
    else3:'',
    workflow:''
};
id:any;
workflowLine:any;
scriptname;
scriptdata;
error;
  constructor( private router : Router,
    private route: ActivatedRoute,
    private _fb: FormBuilder,private SureOpsscriptmasterService: SureOpsscriptmasterService,
    private toastr:ToastrService,) { }

  ngOnInit(): void {
    this.getall();
    this.entryForm = this._fb.group({
      title : [null],
      type:[null],
      id:[null],
      //nodeid: this._fb.array([this.initLinesForm()]),
      });
      this.nodeEntryForm = this._fb.group({

        title:[null],
        description:[null],
        script:[null],
        variables:[null],
        active:[null],
        status:[null],
        a_uri:[null],
        b_uri:[null],
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
      });
    this.updateId = this.route.snapshot.params["id"];
    console.log("update with id = ", this.updateId);
    this.getData(this.updateId);
  }
getData(id:any){
  this.SureOpsscriptmasterService.getById(id).subscribe((data)=>{
    console.log("Data By id ",data);
    this.workflowLine = data.script_Lines;
    this.scriptname=data.script_name;
    console.log("workflow line ",this.workflowLine);
    if(this.workflowLine[0].model != '')
    {
      console.log("if condition");
      this.workflowdata = JSON.parse(this.workflowLine[0].model) ;
    }
    console.log(typeof this.workflowLine[0].model);
    console.log("id ",this.workflowLine[0].id);
    this.id = data.script_Lines[0].id;
    console.log("this.id ",this.id);
   // this.workflowdata = this.workflowLine[0].model;
    console.log(typeof this.workflowdata);
    console.log("model data ",this.workflowdata);
  },
  (error)=>{
    console.log(error);
  });
}
getall(){
  this.SureOpsscriptmasterService.getall().subscribe((data)=>{
    console.log(data);
    this.scriptdata=data;
    if(data.length == 0){
      this.error="No data Available plz add if Required";
      console.log(this.error)
    }
        },(error) => {
          console.log(error);
          if(error){
           this.error="Server Error";
         }
        });

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
workflowmodalOPen(type)
  {
    console.log("static type  ",type);
    let typeno = type;
    switch (typeno) {
      case 1:
        this.type = "Custom" ;
          break;
      case 2:
        this.type = "Script Master" ;
          break;
      case 3:
        this.type = "Create File" ;
          break;
      case 4:
        this.type = "Decision Box" ;
          break;
      case 5:
        this.type = "Workflow" ;
        break;
        case 6:
          this.type = "Script1" ;
          break;
        case 7:
          this.type= this.val;
          break;
    }

      this.workflowmodal = true;
  }
val;
  onch(val){
    this.entryForm.value.title=val;
    this.entryForm.value.type=val;

  }
  onSubmit(){
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
  onSubmit1(val){
    this.entryForm.value.title=val;
    this.entryForm.value.type=val;
this.entryForm.value.id=1;
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

    this.SureOpsscriptmasterService.updateLineById(this.id,this.workflow_Lines).subscribe((data)=>{
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
navi(){
  this.router.navigate(["../../../sureopsscriptmaster1"], { relativeTo: this.route });
}
}
