import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataflowService } from 'src/app/services/fnd/dataflow.service';

@Component({
  selector: 'app-dataelement',
  templateUrl: './dataelement.component.html',
  styleUrls: ['./dataelement.component.scss']
})
export class DataelementComponent implements OnInit {
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
    storetable:'',
      sourcetable:'',
      cron:'',
      detach:'',
      createnewtable:'',
      every:'',
      refreshtype:'',
      active:'',
      filters:'',
      mappers:''
};
entitydata;
tdata:any={};
pipeline_name;
workflowdatajson;
getlinedata;
datajson;
table_prefix;
  constructor( private router : Router,
    private route: ActivatedRoute,
    private _fb: FormBuilder,private dataservice:DataflowService,
    private toastr:ToastrService,private cdRef: ChangeDetectorRef) { }

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
      storetable:[null],
      sourcetable:[null],
      cron:[null],
      detach:[null],
      createnewtable:[null],
      every:[null],
      refreshtype:[null],
      active:[null],
      filters:[null],
      mappers:[null]
    });
    this.updateId = this.route.snapshot.params["id"];
    console.log("update with id = ", this.updateId);
    //this.getData(this.updateId);
this.getById(this.updateId)

this.route.queryParams.subscribe(params => {
  this.id = params['id'];
  const data = params['data'];  
  if (data) {
    try {
      this.datajson = JSON.parse(data);
      console.log('Received data:', this.datajson);
    } catch (e) { console.error('Invalid JSON:', data);}
  }
});


  }
  getById(id: number) {
    this.dataservice.getById(id).subscribe((data) => {
        this.tdata = data;
        console.log(this.tdata);
        this.workflowLine = this.tdata.dataflow_lines;
        this.table_prefix = this.tdata.table_prefix;
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

      
      
      //
    },
    (error)=>{
      console.log(error);
    });

  }

  autoMapping(){
    console.log(this.tdata.auto_table_mapping)
    if(this.tdata.auto_table_mapping === true){
      // const prefix = this.tdata.table_prefix
      // const prefixdata = prefix + this.nodeEditProperties.title
      // console.log(prefixdata)
      // this.nodeEditProperties.title = prefixdata;
      // this.nodeEditProperties.storetable = prefixdata;
      this.nodeEditProperties.createnewtable = 'true';
      console.log(this.nodeEditProperties.createnewtable )
    }
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
console.log(this.nodeEditProperties);
  }
title;
  onClick(item) {
    console.log("entity Clicked",item);
    Object.keys(this.hideme).forEach(h => {
      this.hideme[h] = false;
    });
    this.hideme[item.id] = true;
    this.modelid = item.id;
    this.processType = item.type;
    this.title = item.title;
    this.nodeEditProperties = item;

     this.autoMapping();

    if(this.nodeEditProperties.createnewtable == 'true') {
      this.transform = false;
      this.checkTransform = false;
    }

    this.nodeEditProperties.cron = this.tdata.cron
    this.nodeEditProperties.refreshtype = this.tdata.refreshtype;
    console.log(this.nodeEditProperties.refreshtype,this.nodeEditProperties.cron);

    if(this.nodeEditProperties.mappers != '' && this.nodeEditProperties.mappers !== undefined && this.nodeEditProperties.createnewtable == 'false') {
      this.checkTransform = false;
      this.transform = true;
    }
    if(this.nodeEditProperties.filters != '' && this.nodeEditProperties.filters !== undefined) {
      this.checkFilter = false;
      this.filter = true;
    }
    this.storetableList();
    this.sourceTableList();
    const condition = this.dataservice.getCondition();
    if(condition === 'mapper'){
      this.transform = true;
      this.checkTransform = false;
      if(this.datajson!== undefined){
        if(this.nodeEditProperties.mappers == 'undefined'){ this.nodeEditProperties.mappers = '';}
        const currentText = this.nodeEditProperties.mappers = '';
        this.mapperdata = currentText + this.datajson;
        this.nodeEditProperties.mappers = this.mapperdata;
        this.Updating();
        // this.nodeEditProperties.filters = JSON.stringify({ foo: this.datajson });
      // const textArea = this.filterd.nativeElement;
      // textArea.value = currentText + '\n' + this.datajson;
      }
  }else if(condition === 'filter'){
      this.filter = true;
      this.checkFilter = false;
    if( this.datajson!== undefined ){
      if(this.nodeEditProperties.filters == 'undefined'){ this.nodeEditProperties.filters = '';}
      const currentText = this.nodeEditProperties.filters = '';
      this.filterdata=  currentText +this.datajson;
      this.nodeEditProperties.filters = this.filterdata;
      this.Updating();
    }
  }
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
        this.type = "ENTITIES" ;
          break;
      case 2:
        this.type = "EVENT" ;
          break;

    }

      this.workflowmodal = true;
  }
  filterdata;
  mapperdata;
  // nodeAdd(id)
  // {
  //   // this.filterclick = true;
  //   // this.mappperclick = true;
  //     console.log("Node Add method");
  //     console.log("nodeEntry",this.nodeEntryForm.value);
  //     console.log(id);

  //   //   let formdata = this.entryForm.value;
  //   // let num = id;

  //   //   this.workflowdata = this.workflowdata.map(item => {
  //   //   if(item.chartid == num)
  //   //     {
  //   //     //item["product_id"] = "thisistest";
  //   //     const xyz = {...item,...formdata}
  //   //     console.log(xyz);
  //   //     return xyz;
  //   //     }
  //   //     return item
  //   //     });
  //   // if(this.nodeEditProperties.mappers != null && this.nodeEditProperties.mappers == 'undefined' ){
  //   //   this.nodeEditProperties.mappers = '';
  //   // }
  // //   const condition = this.dataservice.getCondition();
  // //   if(condition === 'mapper'){
  // //     this.transform = true;
  // //     this.checkTransform = false;
  // //     if(this.datajson!== undefined){
  // //       if(this.nodeEditProperties.mappers == 'undefined'){ this.nodeEditProperties.mappers = '';}
  // //       const currentText = this.nodeEditProperties.mappers = '';
  // //       this.mapperdata = currentText + '\n' +this.datajson;
  // //       this.nodeEditProperties.mappers = this.mapperdata;
  // //       // this.nodeEditProperties.filters = JSON.stringify({ foo: this.datajson });
  // //     // const textArea = this.filterd.nativeElement;
  // //     // textArea.value = currentText + '\n' + this.datajson;
  // //     }
  // // }else if(condition === 'filter'){
  // //     this.filter = true;
  // //     this.checkFilter = false;
  // //   if( this.datajson!== undefined ){
  // //     if(this.nodeEditProperties.filters == 'undefined'){ this.nodeEditProperties.filters = '';}
  // //     const currentText = this.nodeEditProperties.filters = '';
  // //     this.filterdata=  currentText + '\n' +this.datajson;
  // //     this.nodeEditProperties.filters = this.filterdata;
  // //   }
  // // }
  // }
  onSubmit(){
    // this.entryForm.value.title=this.entryForm.value.type;
     console.log("addWorkflowDb data");
     console.log(this.entryForm.value);
 if(this.entryForm.value.type =='ENTITIES'){
  this.entryForm.value.title='LOCATION'
 }else if(this.entryForm.value.type=='POST'){
   this.entryForm.value.title='Post-Call Create User Git Api'
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
   workflow_Lines = {
    model:{}
  }
   UpdateLine(){
    console.log('update button clicked.......');
    console.log(this.workflowdata);
    let tmp = JSON.stringify(this.workflowdata); //.replace(/\\/g, '')
    // console.log("temp data",typeof tmp);
    // console.log(tmp);
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

  Updating(){
    let tmp = JSON.stringify(this.workflowdata);
    this.workflow_Lines.model = tmp;
    this.dataservice.updatelines(this.id,this.workflow_Lines).subscribe((data)=>{
      console.log(data);
    },
    (error: any)=>{
        console.log(error);
    });
  }
  create(){
   this.dataservice.createjob(this.updateId).subscribe((data)=>{
    console.log(data);
    if(data){
      this.toastr.success("Sure Job Created successfully");
    }
   },(error) => {
    console.log(error);
    if(error){
      this.toastr.error("No data Available OR server Error");
   }
  })
  }
  job(){
    this.router.navigate(["../../surejob/"], { relativeTo: this.route, queryParams: {entityId:this.updateId }});

  }

  updateWorkflowData(newValue: string){
    this.workflowdatajson = newValue;
  }
  mappperclick = false;
  goFromMapper(){
    //this.mappperclick = true;
    this.dataservice.setCondition('mapper');
    this.router.navigate(["../../mapperTable/"], { relativeTo: this.route, queryParams: { id: this.updateId, data: this.nodeEditProperties.mappers, title:this.nodeEditProperties.title }, skipLocationChange: true});
    console.log("gofrommapper",this.updateId,this.nodeEditProperties.mappers)
    // if(this.mappperclick = true && this.datajson!= null){
    //   this.nodeEditProperties.mappers = this.datajson;
    // }
  }
  filterclick = false;
  goFromFilter(){
   // this.filterclick= true;
    this.dataservice.setCondition('filter');
    this.router.navigate(["../../filterTable/"], { relativeTo: this.route, queryParams: { id: this.updateId, data: this.nodeEditProperties.filters, title:this.nodeEditProperties.title }, skipLocationChange: true});
    console.log("gofromFilter",this.updateId,this.nodeEditProperties.filters)
    // if(this.filterclick = true && this.datajson!= null ){
    //   this.nodeEditProperties.filters = this.datajson;
    // }
  }

  transform:boolean = false;
  checkTransform:boolean = true;
  sourceData: string;
  storeData: string;
  sourceFData:string;

  storetableList(){
    this.dataservice.getColumnListFromStoreTable(this.updateId,this.nodeEditProperties.storetable).subscribe((data)=>{
      console.log(data);
      // this.storeData = JSON.stringify(data); //.replace(/"/g, "'")
      const objectArray = data.map(fieldname => ({
        fieldname: fieldname,
        checkboxval: "",
        sample_format: "",
        mapped_fields: "",
        dest_format: ""
      }));
      // console.log(objectArray);
      this.storeData = JSON.stringify(objectArray);
      // console.log(this.storeData);
  },(error) => {
    console.log(error);
  });
  }

   sourceTableList(){
    this.dataservice.getColumnListFromSourceTable(this.updateId,this.nodeEditProperties.title).subscribe((data)=>{
      console.log(data);
      // this.sourceData= JSON.stringify(data);
      const objectArray = data.map(fieldname => ({
        fieldname: fieldname,
        checkboxval: "",
        sample_format: "",
        mapped_fields: "",
        dest_format: ""
      }));
      // console.log(objectArray);
      this.sourceData = JSON.stringify(objectArray);
      // console.log(this.sourceData);
  },(error) => {
    console.log(error);
  });
}

 checkTrans(){
   
    console.log("transform open")
    // console.log(this.storeData);
    if(this.storeData){
      this.checkTransform = false;
      this.transform = true;
      console.log(this.storeData);
        if(this.nodeEditProperties.mappers === "undefined"){ this.nodeEditProperties.mappers = '';}
      const currentText = this.nodeEditProperties.mappers;
          let trnsfData = currentText + '' +this.storeData;
          this.nodeEditProperties.mappers = trnsfData;
          this.Updating();

    }else if(this.sourceData){
      this.checkTransform = false;
      this.transform = true;
      console.log(this.sourceData);
        if(this.nodeEditProperties.mappers === "undefined"){ this.nodeEditProperties.mappers = '';}
      const currentText = this.nodeEditProperties.mappers;
          let trnsfData = currentText + '' +this.sourceData;
          this.nodeEditProperties.mappers = trnsfData; 
          this.Updating();
    }else {
      this.checkTransform = true;
      this.transform = false;
    }
     
  }
  transReset(){
    this.nodeEditProperties.mappers = '';
    this.transform = false;
    this.checkTransform = true;
    this.Updating();
  }

  filter:boolean = false;
  checkFilter:boolean = true;

  FilDemo(){
    let data = [""];
 const defaultObject = {
  andor: "AND",
  fields_name: "",
  condition: "=",
}
  const objectArray = data.map(value => ({
    ...defaultObject,
    value: value,
  }));
  console.log(objectArray);
  this.sourceFData = JSON.stringify(objectArray);
  }
 checkFil(){
  console.log("filter open")
  this.FilDemo();
  // console.log(this.sourceFData);

    if(typeof this.sourceFData !== undefined){
      this.filter = true;
      this.checkFilter = false;
      console.log(this.sourceFData);
          if(this.nodeEditProperties.filters === '"undefined"'){ this.nodeEditProperties.filters = '';}
        const currentText = this.nodeEditProperties.filters;
            let filterData = currentText + '' +this.sourceFData;
            this.nodeEditProperties.filters = filterData;
            this.Updating();
    }
  }
  filterReset(){
    this.nodeEditProperties.filters = '';
    this.filter = false;
    this.checkFilter = true;
    this.Updating();
  }

  setCron(value: string){
    this.nodeEditProperties.cron = value;
  }
  cronGen(){
    console.log('cronGen open')
    this.nodeEditProperties.cron = '0/10 * * * * ?';
  }
}
