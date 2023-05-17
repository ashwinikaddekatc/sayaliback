import { HttpErrorResponse, HttpHeaderResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatastoreService } from 'src/app/services/fnd/datastore.service';

@Component({
  selector: 'app-datastoreadd',
  templateUrl: './datastoreadd.component.html',
  styleUrls: ['./datastoreadd.component.scss']
})
export class DatastoreaddComponent implements OnInit {
  public entryForm: FormGroup;
  selectedFile: File[]=[];
  type = ["MYSQL","postgresql","mysqllite","oracle","Snowflake","BigQuery","RedShift","microsoft sql server","redis","maria_db","MongoDB","firebase","dynamodb","ibm DB2","couchbase","ElasticSearch","Casandra","OrientDB","Neo4j","FireBird"];
  constructor(private _fb: FormBuilder, private router: Router,private toastr: ToastrService,
    private route: ActivatedRoute,private dataservice:DatastoreService) { }

  ngOnInit(): void {
    this.entryForm = this._fb.group({
      data_store_name:[null],
      data_store_type:[null],
      description: [null],
      active: [null],
      database_name: [null],
      db_host_name: [null],
      portnumber: ['3306'],
      user_name: [null],
      password:[null],
      connectssh:[null],
      ssh_host_name:[null],
      ssh_file_key:[null],
     ssh_user_name:[null],
     ssh_password:[null],
    });
  }
  public onFileChanged(event) {
    //Select File
    console.log(event);
    this.selectedFile = event.target.files[0];
    //for (var i = 0; i < event.target.files.length; i++) {
      // var name = event.target.files[i].name;
      // var type = event.target.files[i].type;
      // var size = event.target.files[i].size;
      // var modifiedDate = event.target.files[i].lastModifiedDate;
     // this.selectedFile.push(event.target.files[i]);
    //}
  }
  onSubmit(){
    console.log(this.entryForm.value);
    this.dataservice.create1(this.entryForm.value,this.selectedFile).subscribe((data)=>{
      console.log(data);
      if(data.status===202){
        this.toastr.success("Added Succesfully");
      }
    }, (error: HttpHeaderResponse)=>{
      console.log(error);
      if(error.status===202){
        this.toastr.success("Added Succesfully");
      }
      if(error.status===404){
        this.toastr.error("Not Added");
      }
      if(error.status===400){
        this.toastr.error("Not Added");
      }
    });
    this.router.navigate(["../all"], { relativeTo: this.route });
  }
  goback(){
    this.router.navigate(["../../datastore/all"], { relativeTo: this.route });
  }

  testConnection(){
    this.dataservice.testConnection(this.entryForm.value.data_store_type, this.entryForm.value.user_name, this.entryForm.value.password, this.entryForm.value.portnumber, this.entryForm.value.db_host_name).subscribe((data)=> {
      console.log(data);
      this.toastr.success('Test Connection successfully');
    },(err) => {
      console.log(err);
      this.toastr.error('Test Connection Failed');
    });
  }
}
