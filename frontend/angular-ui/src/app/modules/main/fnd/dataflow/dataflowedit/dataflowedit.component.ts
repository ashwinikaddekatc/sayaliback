import { HttpHeaderResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataflowService } from 'src/app/services/fnd/dataflow.service';
import { DatastoreService } from 'src/app/services/fnd/datastore.service';

@Component({
  selector: 'app-dataflowedit',
  templateUrl: './dataflowedit.component.html',
  styleUrls: ['./dataflowedit.component.scss']
})
export class DatafloweditComponent implements OnInit {
id;
tdata:any={};
storedata;
sourcedata;
type = ["MYSQL","postgresql","mysqllite","oracle","Snowflake","BigQuery","RedShift","microsoft sql server","redis","maria_db","MongoDB","firebase","dynamodb","ibm DB2","couchbase","ElasticSearch","Casandra","OrientDB","Neo4j","FireBird"];
  constructor( private router: Router,
    private route: ActivatedRoute,private dataservice:DataflowService,
    private toastr: ToastrService,private data1service:DatastoreService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    console.log("update with id = ", this.id);
    this.getById(this.id);
    this.getdatasource();
    this.getdatastore();
  }
  getById(id: number) {
    this.dataservice.getById(id).subscribe((data) => {
        this.tdata = data;
        console.log(this.tdata)

      },
      (err) => {
        console.log(err);
      }
    );
  }
  getdatastore(){
    this.data1service.getAll().subscribe((data)=>{
      console.log(data);
      this.storedata=data;
    })
      }
      getdatasource(){
    this.data1service.getAll2().subscribe((data)=>{
      console.log(data);
      this.sourcedata=data;
    })
      }
      val(val){
        this.tdata.every=val;
      }
  onSubmit(){
    this.dataservice.update(this.id,this.tdata).subscribe((data)=>{
      console.log(data);
      // if(data.status===202){
      //   this.toastr.success("Updated Succesfully");
      // }
    },(error: HttpHeaderResponse)=>{
      console.log(error);
      if(error.status===202){
        this.toastr.success("Updated Successfully");
      }
      if(error.status===404){
        this.toastr.error(" NotUpdated Successfully");
      }

    });
    this.router.navigate(["../../../dataflow/all"], { relativeTo: this.route });

  }
  goback(){
    this.router.navigate(["../../dataflow/all"], { relativeTo: this.route });
  }
  setCron(value: string){
    this.tdata.cron = value;
  }
}
