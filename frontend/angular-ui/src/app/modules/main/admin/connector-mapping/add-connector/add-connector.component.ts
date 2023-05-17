import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DndDropEvent, DropEffect } from 'ngx-drag-drop';
import { ToastrService } from 'ngx-toastr';
import { ConnectorMappingService } from 'src/app/services/admin/connector-mapping.service';



@Component({
  selector: 'app-add-connector',
  templateUrl: './add-connector.component.html',
  styleUrls: ['./add-connector.component.scss']
})
export class AddConnectorComponent implements OnInit {
  postv=false;
  getv=false;
  checkboxedit:boolean = false;
  dropedItems = [];
  serverData = [];
  postJson;
  getValues;
  submitted = false;
  entityid;
  // https://stackblitz.com/edit/angular-eokmnn?file=src%2Fapp%2Fapp.component.ts,src%2Fapp%2Fapp.component.html
  //https://stackoverflow.com/questions/58246831/looping-through-form-array-inside-form-group-angular

   //listgetapi = ['log configuration','workflow','NSCO','Job Log','headerLines'];
   listgetapi;
    // postFields = [
    //   { id: 1, names: 'log configuration' },
    //   { id: 2, names: 'workflow' },
    //   { id: 2, names: 'NSCO' },
    //   { id: 2, names: 'Job Log' },
    //   { id: 2, names: 'headerLines' }
    //  ];submitted = false;
    postFields ;
    getcolfields:boolean = false;
    public entryForm: FormGroup;
    public postModelForm: FormGroup;
    public getModelForm: FormGroup;

    constructor(private _fb:FormBuilder,
      private router: Router,
      private route: ActivatedRoute,
      private connectorService: ConnectorMappingService,
      private toastr:ToastrService,
      ) { }

    ngOnInit(): void {
      
      // this.route.queryParams.subscribe(params => {
      //   this.entityid = params['entityId'];
      //   // Do something with the ID, e.g. fetch data using it
      // });
      // this.getById(this.entityid)
      this.entryForm = this._fb.group({
        name: ['', Validators.required],
        get_str:[null],
       connector_json: this._fb.array([])
      });
     // this.postdata();

      this.postModelForm = this._fb.group({
        mappingString : [null]
      });
      this.getModelForm = this._fb.group({
        mappingString : [null]
      });
     // this.entryForm.enable()
    }
    get f() { return this.entryForm.controls; }
    get person() {
      return this.entryForm.get("connector_json") as FormArray;
    }
    public get w9InfoDetails(): FormArray {
      return <FormArray>this.entryForm.controls['connector_json'];
    }
    selectedBoolValue
checkboxreadonly(i){
  this.selectedBoolValue = i;
  console.log(this.selectedBoolValue);
  const formGroup = this.w9InfoDetails.at(i);
  const checkboxvalFormControl = !formGroup.get('checkboxval').value
  const sample_formatFormControl = formGroup.get('sample_format');
  const mapped_fieldsFormControl= formGroup.get('mapped_fields');
  console.log(sample_formatFormControl.value);
  console.log(checkboxvalFormControl,"checkboxval")

  if (checkboxvalFormControl==true) {
    sample_formatFormControl.disable();
    mapped_fieldsFormControl.disable();
  } else {
    //sample_formatFormControl.setValue(null)
    sample_formatFormControl.enable();
    mapped_fieldsFormControl.enable();
  }
  //let menuButton = document.getElementById("sample");
   // menuButton.style.border= '#808080';
  //this.entryForm.value.connector_json.mapped_fields.disable()
  //this.entryForm.value.mapped_fields.disable()
  //this.entryForm.disable()
}
    postdata()
    {
      console.log("post data");
      this.serverData = this.postFields;
      console.log("this.serverData ",this.serverData);
      this.ngOnInit();
      this.serverData.map(d =>
        this.person.push(this._fb.group({ fieldname: d , checkboxval:'',sample_format:'',mapped_fields:'',dest_format:''}))
      );

    }
    reloadgetFields()
    {
      console.log("reloadgetFields Method");
    console.log("All form value  ",this.getModelForm.value);

      this.connectorService.getValues1(this.getModelForm.value).subscribe((data)=>{
        console.log("values ",data);
        this.listgetapi = data;
        this.getcolfields = true;
    });

// var newArr=  this.listgetapi.map(el => 'images/' + el)
// console.log(newArr);
    }
    reloadPostApi()
    {

    var jsonObj = {"person":"me","age":"30","log":"log2"};

    let emp_details = {
      "emp_name": "Adam",
      "emp_salary": "12344",
      "emp_age" : "25"
    } ;

    console.log("reloadPostApi Method");
    console.log("All form value  ",this.postModelForm.value);

     this.connectorService.getkeys(this.postModelForm.value).subscribe((data)=>{
       console.log("keys ",data);
       this.postFields = data;
       console.log(this.postFields);
       if(data)
       {
        this.postdata();
       }
     });

    }
    blurEvent(event: any){
      console.log("textarea value ",event.target.value);
      this.postJson = event.target.value;
      console.log("Key in blur event ", this.postJson);

    }
    blurEvent2(event: any){
      console.log("textarea2 value ",event.target.value);
      //this.postJson = event.target.value
      this.getValues = event.target.value;
      console.log(this.getValues);
    }
    onSubmit()
    {
      console.log("onSubmit Method");
      console.log(this.entryForm.value.connector_json);
      this.entryForm.value.connector_json = JSON.stringify(this.entryForm.value.connector_json);
      this.entryForm.value.get_str = JSON.stringify(this.listgetapi);
      console.log("post table col ",this.entryForm.value.connector_json);
      let product = JSON.stringify(this.entryForm.value.connector_json);
      console.log(product)
      // let newproduct = Object.assign({}, product);
      // console.log("newprod",newproduct)
      // console.log("get mapping data ",this.entryForm.value.get_str);
      console.log("form data ",this.entryForm.value);

      this.connectorService.create(this.entryForm.value).subscribe((data)=>{
        console.log(data);
         this.router.navigate(['../all'],{relativeTo:this.route});
        //  this.router.navigate(['/cns-portal/dataflow/gotoentity/'+this.entityid],{relativeTo:this.route, queryParams: { id: this.entityid, data: product }, skipLocationChange: true});
        if(data)
        {
          this.toastr.success('Added successfully');
        }
      },
      (error)=>{
        if(error){
            this.toastr.error('Not Added Data Getting Some Error');
        }
      });
    }

    onDragged( item:any, list:any[], effect:DropEffect ) {
      if( effect === "move" ) {
        const index = list.indexOf( item );
        list.splice( index, 1 );
      }
    }

    simpleDrop:any;
    onDragged2( item:any, list:any[], effect:DropEffect ) {
      if( effect === "move" ) {
        const index = list.indexOf( item );
        list[index]=this.simpleDrop;
      }
    }
    onDragStart(event:DragEvent) {
      // console.log("drag started", JSON.stringify(event, null, 2));
    }

    onDragEnd(event:DragEvent) {
      // console.log("drag ended", JSON.stringify(event, null, 2));
    }

    onDraggableCopied(event:DragEvent) {
      // console.log("draggable copied", JSON.stringify(event, null, 2));
    }

    onDraggableLinked(event:DragEvent) {
      // console.log("draggable linked", JSON.stringify(event, null, 2));
    }


    onDragCanceled(event:DragEvent) {
      // console.log("drag cancelled", JSON.stringify(event, null, 2));
    }

    onDragover(event:DragEvent) {
      // console.log("dragover", JSON.stringify(event, null, 2));
    }
    onDrop( event:DndDropEvent, list?:any[] )
    {
        console.log("Ondrop event");
        if( list && (event.dropEffect === "copy" || event.dropEffect === "move") )
        {
            if(event.dropEffect === "copy")
            event.data.name = event.data.type+'-'+new Date().getTime();
            let index = event.index;
            if( typeof index === "undefined" ) {
              index = list.length;
            }

            list.splice( index, 0, event.data );
            console.log(list);
        }
    }
    postjson(){
this.postv=true;
    }
    getjson(){
      this.getv=true;
    }
    tdata:any={};
    workflowLine;
    workflowdata:any[]=[];
    check;
}
