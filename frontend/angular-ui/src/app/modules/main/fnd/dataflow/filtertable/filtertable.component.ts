import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataflowService } from 'src/app/services/fnd/dataflow.service';

@Component({
  selector: 'app-filtertable',
  templateUrl: './filtertable.component.html',
  styleUrls: ['./filtertable.component.scss']
})
export class FiltertableComponent implements OnInit {

  serverData = [];
  andor = ['AND', 'OR','NOT'];
  fieldname = ['name1', 'name2'];
  condition = ['=','!=','<','>','<=','>=','LIKE','BETWEEN','IN'];
  id;
  title
  sourceTable;
  // data = ['email', 'password']
  constructor( private router : Router,
    private route: ActivatedRoute,
    private dataservice:DataflowService,
    private _fb:FormBuilder) { }

    public entryForm: FormGroup;

  ngOnInit(): void {
    // this.entryForm = this._fb.group({
    //    connector_json: this._fb.array([])
    // });

    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      const data = params['data'];  
      this.title = params['title'] 
      if (data) {
        // try {
        //   this.serverData = data.replace(/\[|\]|"/g, '').split(','); //(/\[|\]|'/g, '') //(/[\[\]"]/g, '')
        //   console.log('Received data:', this.serverData );
        // } catch (e) { console.error('Invalid JSON:', data);}
        try {
          this.serverData = JSON.parse(data);
          console.log('Received data:', this.serverData );
        } catch (e) { console.error('Invalid JSON:', data);}
      }
      // this.serverData.map(d =>
      //   this.person.push(this._fb.group({ andor: '', fields_name:'',condition:'',value: d ,}))
      // );

    });

    const condition = this.dataservice.getCondition();
    if(condition === 'mapper'){
      console.log("mapper")
    }else if(condition === 'filter'){
      console.log("filter");
    }

    this.dataservice.getColumnListFromSourceTable(this.id,this.title).subscribe((data)=>{
      console.log(data);
      this.sourceTable = data;
    });
  }
  // get person() {
  //   return this.entryForm.get("connector_json") as FormArray;
  // }

  onUpdate(){
    console.log(this.serverData);
    let serverData = JSON.stringify(this.serverData);
    console.log(serverData);
    let product = JSON.stringify(serverData);
    console.log(product);
     this.router.navigate(['../gotoentity/'+this.id],{relativeTo:this.route, queryParams: { id: this.id, data: product }, skipLocationChange: true});
  }
  back(){
    this.router.navigate(["../gotoentity/" + this.id], { relativeTo: this.route });
  }

  onAddLines(){
    this.serverData.push({
      andor: "AND",
      fields_name: "",
      condition: "=",
      value: ""
    });
  }
  deleteRow(index) {
    this.serverData.splice(index, 1);
  }

  // postApi(){
  //  this.data.map(d =>
  //   this.person.push(this._fb.group({ fieldname: d , checkboxval:'',sample_format:'',mapped_fields:'',dest_format:''}))
  // ); 
  // }
}
