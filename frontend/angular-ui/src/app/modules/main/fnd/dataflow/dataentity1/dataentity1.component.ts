import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataflowService } from 'src/app/services/fnd/dataflow.service';
import { OutgoingwebhookService } from 'src/app/services/fnd/outgoingwebhook.service';

@Component({
  selector: 'app-dataentity1',
  templateUrl: './dataentity1.component.html',
  styleUrls: ['./dataentity1.component.scss']
})
export class Dataentity1Component implements OnInit {
  entitydata;
  updateId;
  public entryForm: FormGroup;
  public nodeEntryForm: FormGroup;
  toggleNodeForm:boolean;
  workflowmodal:boolean = false;
  workflow_data;
  type:any;
  workflowdata:any[]=[];
  storedata:any[] = [];
  hideme = {};
  tdata;
pipeline_name;
workflowLine:any;
id;
  val=['label label-purple clickable','label label-blue clickable','label label-orange clickable']
  constructor(private _fb: FormBuilder, private router: Router,private dataservice:DataflowService,
    private route: ActivatedRoute,private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.entryForm = this._fb.group({
      title : [null],
      type:[null],
      id:[null],
      });
    this.updateId = this.route.snapshot.params["id"];
    console.log("update with id = ", this.updateId);
    this.getsourcedata(this.updateId);
    this.getstoredata(this.updateId);
    this.getById(this.updateId);
  }
  getById(id: number) {
    this.dataservice.getById(id).subscribe((data) => {
        this.tdata = data;
        console.log(this.tdata);
        this.workflowLine = this.tdata.dataflow_lines;
      this.pipeline_name=this.tdata.pipeline_name;
      console.log("workflow line ",this.workflowLine);
      if(this.workflowLine[0].model != '')
      {
        console.log("if condition");
        this.workflowdata = JSON.parse(this.workflowLine[0].model) ;
      }
      console.log(typeof this.workflowLine[0].model);
      console.log("id ",this.workflowLine[0].id);
      this.id =this.tdata.dataflow_lines[0].id;
      console.log("this.id ",this.id);
     // this.workflowdata = this.workflowLine[0].model;
      console.log(typeof this.workflowdata);
      console.log("model data ",this.workflowdata);
    },
    (error)=>{
      console.log(error);
    });


  }
  getsourcedata(id){
    this.dataservice.getsourcedata(id).subscribe((data)=>{
      console.log("sourcedata",data);
      this.entitydata=data;

    },(error:HttpErrorResponse) => {
      console.log(error);
      if(error.error==500){
       this.toastr.error(error.error);
     }
    });

  }
  getstoredata(id){
    this.dataservice.getstoredata(id).subscribe((data)=>{
      console.log(data);
      // this.storedata=data;
    },(error:HttpErrorResponse)=>{
      if (error.error==400){
        this.toastr.error(error.error);
      }
    })
  }
  workflowmodalOPen(type)
  {
    console.log("static type  ",type);
    this.entryForm.value.title=type;
    let typeno = type;
    switch (typeno) {
      case 1:
        this.type = "ENTITIES" ;
          break;
    }

      this.workflowmodal = true;
  }
  nodeAdd(id)
  {
      console.log("Node Add method");
      console.log(this.nodeEntryForm.value);
      console.log(id);

      let formdata = this.entryForm.value;
    let num = id;

      this.storedata = this.storedata.map(item => {
      if(item.chartid == num)
        {
        //item["product_id"] = "thisistest";
        const xyz = {...item,...formdata}
        console.log(xyz);
        return xyz;
        }
        return item
        });
      console.log(this.storedata);

  }
  workflow_Lines = {
    model:''
  }
  UpdateLine(){
    console.log('update button clicked.......');
    console.log(this.storedata);
    let tmp = JSON.stringify(this.storedata);
    console.log("temp data",typeof tmp);
    console.log(tmp);
    this.workflow_Lines.model = tmp;
console.log(this.workflow_Lines);
    this.dataservice.updatelines(this.id,this.workflow_Lines).subscribe((data)=>{
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

  onSubmit(){
     console.log("addWorkflowDb data");
     console.log(this.entryForm.value);
     this.workflowdata.push(this.entryForm.value);
     this.entryForm.reset();
     console.log(this.workflowdata);
     this.workflowmodal = false;
        this.workflowdata.sort(
     (n1,n2)=>{

        return n1.id-n2.id;
    })
    console.log(this.workflowdata);
    this.workflowdata=this.storedata;
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
   addval(val){
    console.log(val);
    this.storedata.push(val);
    console.log("all store",this.storedata);
    this.entitydata = this.entitydata.filter(item => item.id !== val.id);
    console.log("After Delete Array ",this.workflowdata);
    Object.keys(this.hideme).forEach(h => {
      this.hideme[h] = false;
    });
   }
   deleteval(val){
    console.log(val);
     this.storedata = this.storedata.filter(item => item.id !== val.id);
    console.log("After Delete Array ",this.workflowdata);
    Object.keys(this.hideme).forEach(h => {
      this.hideme[h] = false;
    });
    this.entitydata.push(val);
    }
}
