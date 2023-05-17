import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConnectorMappingService } from 'src/app/services/admin/connector-mapping.service';
import { JobmanagementService } from 'src/app/services/fnd/jobmanagement.service';

@Component({
  selector: 'app-jobdefination',
  templateUrl: './jobdefination.component.html',
  styleUrls: ['./jobdefination.component.scss']
})
export class JobdefinationComponent implements OnInit {
  type:any;
  id:any;
  workflowmodal:boolean = false;
  public entryForm: FormGroup;
  public nodeEntryForm: FormGroup;
  workflowdata:any[]=[];
  hideme = {};
  toggleNodeForm:boolean;
  modelid:number ;
  processType:any;
  error;
  data;
  workflow_Lines = {
    model:''
  }
  nodeEditProperties = {
    id : '',
    type: '',
    title : '',
    sequence:'',
    connectionname:'',
    method:'',
    url:'',
    mapping_model:'',
};
updateId;
  constructor(
    private router : Router,
    private route: ActivatedRoute,
    private _fb: FormBuilder,
    private jbmaservice:JobmanagementService,
    private connectorService: ConnectorMappingService,
    private toastr:ToastrService,) { }

  ngOnInit(): void {
    this.updateId = this.route.snapshot.params["id"];
    console.log("update with id = ", this.updateId);
    //this.getData(this.updateId);

    this.entryForm = this._fb.group({
      title : [null],
      type:[null],
      id:[null],

      });


    this.nodeEntryForm = this._fb.group({
      sequence:[null],
      connectionname:[null],
      method:[null],
      url:[null],
      mapping_model:[null],

    });
  }
  workflowmodalOPen(type)
  {
    console.log("static type  ",type);
    let typeno = type;
    switch (typeno) {
      case 1:
        this.type = "Node" ;
          break;
      case 2:
        this.type = "Script" ;
          break;
      // case 3:
      //   this.type = "Create File" ;
      //     break;
      // case 4:
      //   this.type = "Decision Box" ;
      //     break;
      // case 5:
      //   this.type = "Workflow" ;
      //   break;
    }

      this.workflowmodal = true;
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
    this.getallconnector();
  }
  getallconnector(){
    this.connectorService.getAll().subscribe((data)=>{
      console.log("connector table ",data);
      this.data = data;
      if(this.data.length==0){
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
   this.workflowdata.sort(
    (n1,n2)=>{
       return n1.id-n2.id;
   })
   console.log(this.workflowdata);
  }
  UpdateLine()
  {
    console.log('update button clicked.......');
    console.log(this.workflowdata);
    let tmp = JSON.stringify(this.workflowdata);
    console.log("temp data",typeof tmp);
    console.log(tmp);
    this.workflow_Lines.model = tmp;
    console.log(this.workflow_Lines);
    this.jbmaservice.updateLineById(this.id,this.workflow_Lines).subscribe((data)=>{
      console.log('Updation Successful...');
      console.log(data);
      //this.ngOnInit();
     // this.router.navigate(["../../all"], { relativeTo: this.route });
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
      alert("Plz First Select Connection Value So You Can Navigate");
return false;
    }else{
      this.router.navigate(['../../connectormapping/edit/'+this.selectedworkflowid],{relativeTo:this.route});
    }

  }
}
