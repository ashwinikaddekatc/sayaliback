import { HttpHeaderResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatastoreService } from 'src/app/services/fnd/datastore.service';

@Component({
  selector: 'app-datasourceedit',
  templateUrl: './datasourceedit.component.html',
  styleUrls: ['./datasourceedit.component.scss']
})
export class DatasourceeditComponent implements OnInit {
  id:any;
  tdata:any={};
  selectedFile: File[]=[];
  type = ["MYSQL","postgresql","mysqllite","oracle","Snowflake","BigQuery","RedShift","microsoft sql server","redis","maria_db","MongoDB","firebase","dynamodb","ibm DB2","couchbase","ElasticSearch","Casandra","OrientDB","Neo4j","FireBird"];
  constructor(private _fb: FormBuilder, private router: Router,
    private toastr: ToastrService,private route: ActivatedRoute,private dataservice:DatastoreService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    console.log("update with id = ", this.id);
    this.getById(this.id);
  }
  getById(id: number) {
    this.dataservice.getById2(id).subscribe((data) => {
        this.tdata = data;
        console.log(this.tdata)

      },
      (err) => {
        console.log(err);
      }
    );
  }
  public onFileChanged(event) {
    //Select File
    console.log(event);
    this.selectedFile = event.target.files[0];

  }
  onSubmit(){
    this.dataservice.update2(this.id,this.tdata,this.selectedFile).subscribe((data)=>{
      console.log(data);
      if(data.status===202){
        this.toastr.success("Updated Succesfully");
      }
    },(error: HttpHeaderResponse)=>{
      console.log(error);
      if(error.status===202){
        this.toastr.success("Updated Successfully");
      }
      if(error.status===404){
        this.toastr.error(" NotUpdated Successfully");
      }
      if(error.status===400){
        this.toastr.error(" NotUpdated Successfully");
      }
    });
    this.router.navigate(["../../../datasource/all"], { relativeTo: this.route });

  }
  goback(){
    this.router.navigate(["../../datasource/all"], { relativeTo: this.route });
  }

}
