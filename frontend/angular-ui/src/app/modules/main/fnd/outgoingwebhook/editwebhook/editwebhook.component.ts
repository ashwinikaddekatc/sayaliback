import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReportBuilderService } from 'src/app/services/api/report-builder.service';
import { OutgoingwebhookService } from 'src/app/services/fnd/outgoingwebhook.service';

@Component({
  selector: 'app-editwebhook',
  templateUrl: './editwebhook.component.html',
  styleUrls: ['./editwebhook.component.scss']
})
export class EditwebhookComponent implements OnInit {
  public entryForm: FormGroup;
  public nodeEntryForm: FormGroup;
  toggleNodeForm:boolean;
  workflowmodal:boolean = false;
  workflow_data;
  hideme = {};
  workflowdata:any[]=[];
  type:any;
  updateId;
  id:any;
  modelid:number ;
  processType:any;
  workflowLine:any;
  nodeEditProperties = {
    id : '',
    title:'',
    type: '',
    name: '',
    description: '',
    active:'',
    onentity:'',
    onevent:'',
    if:'',
    thenstep:'',
    elsestep:'',
    connectionname:'',
    url:'',
   token:'',
   param1:'',
   param2:'',
   param3:'',
   mappingstring:'',
};
entitydata;
webhookname;
  constructor( private router : Router,private webhookservice:OutgoingwebhookService,
    private route: ActivatedRoute,private reportBuilderService: ReportBuilderService,
    private _fb: FormBuilder,
    private toastr:ToastrService,) { }

  ngOnInit(): void {
    this.entryForm = this._fb.group({
      title : [null],
      type:[null],
      id:[null],
      });


    this.nodeEntryForm = this._fb.group({
      title:[null],
      name:[null],
      description:[null],
      active:[true],
      onentity:[null],
      onevent:[null],
      if:[null],
      thenstep:[null],
    elsestep:[null],
    connectionname:[null],
    url:[null],
    token:[null],
    param1:[null],
   param2:[null],
   param3:[null],
   mappingstring:[null],
    });
    this.updateId = this.route.snapshot.params["id"];
    console.log("update with id = ", this.updateId);
    this.getData(this.updateId);
    this.getonentity();
  }
  getonentity(){
    this.webhookservice.getallentity().subscribe((data)=>{
      console.log(data);
      this.entitydata=data;
    })
    // this.reportBuilderService.getallentity().subscribe((data)=>{
    //   console.log(data);
    //   this.entitydata=data.items;
    //   console.log(this.entitydata);
    // })
  }
  getData(id:number)
  {
    this.webhookservice.getById(id).subscribe((data)=>{
      console.log("Data By id ",data);
      this.workflowLine = data.outgoing_Lines;
      this.webhookname=data.webhook_name;
      console.log("workflow line ",this.workflowLine);
      if(this.workflowLine[0].model != '')
      {
        console.log("if condition");
        this.workflowdata = JSON.parse(this.workflowLine[0].model) ;
      }
      console.log(typeof this.workflowLine[0].model);
      console.log("id ",this.workflowLine[0].id);
      this.id = data.outgoing_Lines[0].id;
      console.log("this.id ",this.id);
     // this.workflowdata = this.workflowLine[0].model;
      console.log(typeof this.workflowdata);
      console.log("model data ",this.workflowdata);
    },
    (error)=>{
      console.log(error);
    });
  }

  nodedata;
  toggleForm(data)
  {
    //document.getElementById
    this.toggleNodeForm = !this.toggleNodeForm;
    console.log(data);
    this.nodedata=data;
    this.modelid = data.id;
    this.processType = data.type;
      console.log(this.modelid);
      this.nodeEditProperties = data;
console.log(this.nodeEditProperties);
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
        this.type = "IN WEBHOOK" ;
          break;
      case 2:
        this.type = "EVENT" ;
          break;
      case 3:
        this.type = "CONDITION" ;
        //this.entryForm.value.title="Condition-User Type Employee"
          break;
      case 4:
        this.type = "GET" ;
          break;
      case 5:
        this.type = "POST" ;
          break;
      case 6:
        this.type = "PUT" ;
        break;
      case 7:
        this.type = "CUSTOM URL" ;
          break;
      case 8:
        this.type = "MAP FIELDS" ;
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
  UpdateLine(){
    console.log('update button clicked.......');
    console.log(this.workflowdata);
    let tmp = JSON.stringify(this.workflowdata);
    console.log("temp data",typeof tmp);
    console.log(tmp);
    this.workflow_Lines.model = tmp;
console.log(this.workflow_Lines);
    this.webhookservice.update1(this.id,this.workflow_Lines).subscribe((data)=>{
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
   // this.entryForm.value.title=this.entryForm.value.type;
    console.log("addWorkflowDb data");
    console.log(this.entryForm.value);
if(this.entryForm.value.type =='EVENT'){
 this.entryForm.value.title='Event- Create User'
}else if(this.entryForm.value.type=='POST'){
  this.entryForm.value.title='POST API'
}
else if(this.entryForm.value.type=='PUT'){
  this.entryForm.value.title='PUT API'
}else if(this.entryForm.value.type=='GET'){
  this.entryForm.value.title='GET API'
 }
else if(this.entryForm.value.type=='CONDITION'){
  this.entryForm.value.title='Condition-User Type Employee'
 }
else if(this.entryForm.value.type=='CUSTOM URL'){
  this.entryForm.value.title='Custom Url-Url Git'
}else if(this.entryForm.value.type=='MAP FIELDS'){
  this.entryForm.value.title='Map Fiels'
}
else if(this.entryForm.value.type=='IN WEBHOOK'){
  this.entryForm.value.title='In Webhook'
}
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
}
