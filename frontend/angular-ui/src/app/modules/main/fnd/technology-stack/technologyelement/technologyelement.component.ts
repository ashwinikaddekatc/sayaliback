import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TechnologyStackService } from 'src/app/services/builder/technology-stack.service';
import { WorkflowDataService } from 'src/app/services/fnd/workflow-data.service';

@Component({
  selector: 'app-technologyelement',
  templateUrl: './technologyelement.component.html',
  styleUrls: ['./technologyelement.component.scss']
})
export class TechnologyelementComponent implements OnInit {
  workflowmodal:boolean = false;
  public entryForm: FormGroup;
  public nodeEntryForm: FormGroup;
  toggleNodeForm:boolean;
  workflowdata:any[]=[];
  workflowLine:any;
  hideme = {};
  type:any;
  modelid:number ;
  processType:any;
  nodeEditProperties = {
    id : '',
    title:'Angular',
    version:'',
    Gittemplate_url:'',
    workflow_deployment:'',
    workflow_buildapp:'',
    workflow_deploy:'',
    workflowbuild_deploy:'',
    workflow_deployment_portno:'',
    workflow_buildapp_portno:'',
    workflow_deploy_portno:'',
    workflowbuild_deploy_portno:'',
    openport:''
};
updateId;
id;
servicename;
workflow_data;
error;
  constructor(private _fb: FormBuilder, private router : Router, private workflowserive:WorkflowDataService,
    private route: ActivatedRoute,private toastr:ToastrService,private technologyStackService: TechnologyStackService) { }

  ngOnInit(): void {

    this.entryForm = this._fb.group({
      title : ['Angular'],
      type:[null],
      id:[null],
      //nodeid: this._fb.array([this.initLinesForm()]),
      });

      this.nodeEntryForm = this._fb.group({

        title:[null],
        version:[null],
        Gittemplate_url:[null],
        workflow_deployment:[null],
        workflow_buildapp:[null],
        workflow_deploy:[null],
        workflowbuild_deploy:[null],
        workflow_deployment_portno:[null],
        workflow_buildapp_portno:[null],
        workflow_deploy_portno:[null],
        workflowbuild_deploy_portno:[null],
        openport:[false],

      });

      this.updateId = this.route.snapshot.params["id"];
      console.log("update with id = ", this.updateId);
      this.getData(this.updateId);
      this.getallworkflow();
  }
  getallworkflow(){
    this.workflowserive.getcallall().subscribe((data)=>{
      console.log(data);
      this.workflow_data = data;
      if(data.length==0){
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
  getData(id:any){
    this.technologyStackService.getById(id).subscribe((data)=>{
      console.log("Data By id ",data);
      this.servicename=data.tech_stack;
      console.log(this.servicename);
      this.workflowLine = data.technology_elements;
      console.log("workflow line ",this.workflowLine);
      if(this.workflowLine[0].model != '')
      {
        console.log("if condition");
        this.workflowdata = JSON.parse(this.workflowLine[0].model) ;
      }
      console.log(typeof this.workflowLine[0].model);
      console.log("id ",this.workflowLine[0].id);
      this.id = data.technology_elements[0].id;
      console.log("this.id ",this.id);
     // this.workflowdata = this.workflowLine[0].model;
      console.log(typeof this.workflowdata);
      console.log("model data ",this.workflowdata);
    },
    (error)=>{
      console.log(error);
    });
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
        this.type = "Service" ;
          break;
      case 2:
        this.type = "Version" ;
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
  onClick(item) {
    console.log(item);
    Object.keys(this.hideme).forEach(h => {
      this.hideme[h] = false;
    });
    this.hideme[item.id] = true;
    this.modelid = item.id;
    this.processType = item.type;
    this.nodeEditProperties = item;
   // this.processType=this.entryForm.value.title;
  }
  onSubmit()
  {
    //this.entryForm.value.title=this.entryForm.value.type;
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
  UpdateLine(){
    console.log('update button clicked.......');
    console.log(this.workflowdata);
    let tmp = JSON.stringify(this.workflowdata);
    console.log("temp data",typeof tmp);
    console.log(tmp);
    this.workflow_Lines.model = tmp;

    this.technologyStackService.updateLineById(this.id,this.workflow_Lines).subscribe((data)=>{
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

}
