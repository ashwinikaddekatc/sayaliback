import { HttpErrorResponse, HttpHeaderResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataflowService } from 'src/app/services/fnd/dataflow.service';
import { DatastoreService } from 'src/app/services/fnd/datastore.service';
import { NewwebhookService } from 'src/app/services/fnd/newwebhook.service';
import { SftplocationService } from 'src/app/services/fnd/sftplocation.service';
import { Webhookservicesui1Service } from 'src/app/services/fnd/webhookservicesui1.service';

@Component({
  selector: 'app-dataflowadd',
  templateUrl: './dataflowadd.component.html',
  styleUrls: ['./dataflowadd.component.scss']
})
export class DataflowaddComponent implements OnInit {
  public DbtostoreForm: FormGroup;
  public emailtowebhookForm: FormGroup;
  public sftpForm: FormGroup;
  public emailtostoreForm: FormGroup;
  public cronJobForm: FormGroup;
  public cronForm;
  sourcedata;
storedata;
EmailWebhookData;
SFTPData;
emailDBData;
modalcron=false;
minute = ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59'];
second = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59'];
hours = ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23'];
daysofmonth =  ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31']
month = ['0','1','2','3','4','5','6','7','8','9','10','11','12'];
daysofweek = ['0','1','1-2','1-3','1-4','1-5','1-6','1-7']
selectedOption = 'DB to Store'
DataflowType = ['DB to Store','Email to Webhook', 'SFTP to Store','Email to Store'];
type = ["MYSQL","postgresql","mysqllite","oracle","Snowflake","BigQuery","RedShift","microsoft sql server","redis","maria_db","MongoDB","firebase","dynamodb","ibm DB2","couchbase","ElasticSearch","Casandra","OrientDB","Neo4j","FireBird"];
  constructor(private _fb: FormBuilder, private router: Router,private dataservice:DataflowService,
    private route: ActivatedRoute,private toastr: ToastrService,private data1service:DatastoreService,
    private emailWebhook:NewwebhookService, private sftpService:SftplocationService, private emailDBService:Webhookservicesui1Service) { }

  ngOnInit(): void {
    this.cronForm = new FormControl('0 0 1/1 * *');

    this.DbtostoreForm = this._fb.group({
      pipeline_name:[null],
      snapshot_type:[null],
      description: [null],
      active: [true],
      select_data_source: [null],
      select_data_store: [null],
      auto_table_mapping: [true],
      port_number: ['3306'],
      table_prefix: [null],
      nested_field_as_json:[null],
      cron:['0/10 * * * * ?'],
     every:[null],
     refreshtype:[null],
     dataflow_lines: this._fb.array([this.initLinesNullForm()]),
    });
    this.emailtowebhookForm = this._fb.group({
      pipeline_name:[null],
      snapshot_type:[null],
      description: [null],
      active: [true],
      select_data_source: [null],
      select_data_store: [null],
      auto_table_mapping: [null],
      port_number: ['3306'],
      table_prefix: [null],
      nested_field_as_json:[null],
      cron:['0/10 * * * * ?'],
     every:[null],
     refreshtype:[null],
     dataflow_lines: this._fb.array([this.initLinesFormWeb()]),
    });
    this.sftpForm = this._fb.group({
      pipeline_name:[null],
      snapshot_type:[null],
      description: [null],
      active: [true],
      select_data_source: [null],
      select_data_store: [null],
      auto_table_mapping: [true],
      port_number: ['3306'],
      table_prefix: [null],
      nested_field_as_json:[null],
      cron:['0/10 * * * * ?'],
     every:[null],
     refreshtype:[null],
     dataflow_lines: this._fb.array([this.initLinesFormSFTP()]),
    });
    this.emailtostoreForm = this._fb.group({
      pipeline_name:[null],
      snapshot_type:[null],
      description: [null],
      active: [true],
      select_data_source: [null],
      select_data_store: [null],
      auto_table_mapping: [true],
      port_number: ['3306'],
      table_prefix: [null],
      nested_field_as_json:[null],
      cron:['0/10 * * * * ?'],
     every:[null],
     refreshtype:[null],
     dataflow_lines: this._fb.array([this.initLinesFormEmail()]),
    });

    this.cronJobForm = this._fb.group({
     minutes:[null],
     hours :[null],
     dayOfMonth :[null],
     month:[null],
     dayOfWeek:[null],
    })
   this.getdatasource();
   this.getdatastore();
   this.getallemailtoWebhook();
   this.getSFTP();
   this.getEmailToDB();
  }
  initLinesNullForm() {
    return this._fb.group({
      model: ''
      //model:JSON.stringify(this.nodeField)
    });
  }
  initLinesFormWeb() {
    
    return this._fb.group({
      model: '[{"title":"Webhook","type":"ENTITIES","id":"1","createnewtable":"","cre…reshtype":null,"storetable":"","flowtype":"Email To Webhook","emailwebhook":"","key":"EW64839","filters":""}]'
      //model:JSON.stringify(this.nodeField)
    });
  }
  initLinesFormSFTP() {
    return this._fb.group({
      model: '[{"title":"SFTP","type":"ENTITIES","id":"1","cre…reshtype":null,"storetable":"SFTP","flowtype":"SFTP To Store","tableName":"","sftpdatabase":"","remoteDirectory":"","filters":"","mappers":""}]'
      //model:JSON.stringify(this.nodeField)
    });
  }
  initLinesFormEmail() {
    return this._fb.group({
      model: '[{"title":"Email","type":"ENTITIES","id":"1","cre…reshtype":null,"storetable":"Email","flowtype":"Email To Store","tableName":"","emaildatabase":"","key":"ED94573","filters":"","mappers":""}]'
      //model:JSON.stringify(this.nodeField)
    });
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
  // val(val){
  //   console.log(val.target.innerText);
  //   this.entryForm.value.every=val;
  // }
  onSubmit1(){
    // if(this.choosedType == 'DB to Store'){
      console.log(this.choosedType)
    console.log(this.DbtostoreForm.value);
    this.dataservice.create(this.DbtostoreForm.value).subscribe((data)=>{
      console.log(data);
      if(data){
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
  onSubmit2(){
    // if(this.choosedType == 'DB to Store'){
      console.log(this.emailtowebhookForm.value);
    this.dataservice.create(this.emailtowebhookForm.value).subscribe((data)=>{
      console.log(data);
      if(data){
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
  onSubmit3(){
    console.log(this.choosedType)
      console.log(this.sftpForm.value);
      this.dataservice.create(this.sftpForm.value).subscribe((data)=>{
        console.log(data);
        if(data){
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
  onSubmit4(){
    console.log(this.choosedType)
      console.log(this.emailtostoreForm.value);
      this.dataservice.create(this.emailtostoreForm.value).subscribe((data)=>{
        console.log(data);
        if(data){
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
    // }, (error: HttpErrorResponse)=>{
    //   console.log(error);
    //   if(error.status===202){
    //     this.toastr.success("Added Succesfully");
    //   }
    //   if(error.status===404){
    //     this.toastr.error("Not Added");
    //   }

    // });
    this.router.navigate(["../all"], { relativeTo: this.route });
  }
  goback(){
    this.router.navigate(["../../dataflow/all"], { relativeTo: this.route });
  }
  openmodal1(){
    this.modalcron=true;
  }
  openmodal2(){
    this.modalcron=true;
  }
  openmodal3(){
    this.modalcron=true;
  }
  openmodal4(){
    this.modalcron=true;
  }
  setCron1(value: string){
    this.DbtostoreForm.setValue({
      ...this.DbtostoreForm.value,
      cron: value
  })
}
  setCron2(value: string){
  this.emailtowebhookForm.setValue({
    ...this.emailtowebhookForm.value,
    cron: value
})
  }
setCron3(value: string){
this.sftpForm.setValue({
  ...this.sftpForm.value,
  cron: value
})
}
setCron4(value: string){
this.emailtostoreForm.setValue({
  ...this.emailtostoreForm.value,
  cron: value
})
}
  choosedType;
  // dbtostore = false;
  // emailtowebhook = false;
  // sftptostore = false
  // emailtostore = false;
  choose(val){
    this.choosedType = val;
        if(val == this.DataflowType[0])
        {
          // this.dbtostore = true;
        }
        if(val == this.DataflowType[1])
        {
          // this.emailtowebhook= true;
          this.dataservice.setDataCondition('EmailtoWebhook');
        }
        if(val == this.DataflowType[2])
        {
          // this.sftptostore= true;
          this.dataservice.setDataCondition('SFTPtoStore');
        }
        if(val == this.DataflowType[3])
        {
          // this.emailtostore= true;
          this.dataservice.setDataCondition('EmailtoStore');
        }
  }

  getallemailtoWebhook(){
    this.emailWebhook.getAll().subscribe((data)=>{
      console.log(data);
      this.EmailWebhookData=data;
    },(error) => {
      console.log(error);
      if(error){
      console.log(error.message);
     }
    });
  }

  getSFTP() {
     this.sftpService.getAllSftpData().subscribe((data) => {
       console.log(data);
       this.SFTPData = data;
     },(error) => {
       console.log(error);
     });
   }

   getEmailToDB() {
    this.emailDBService.getAll().subscribe(data=>{
      this.emailDBData = data;
      console.log(data);
    },(error) => {
      console.log(error);
    });
  }

  chooseStore(val){
    //this is for dependent select option
  }
  generatedCron;
  generateCronJob() {
    const minutes = this.cronJobForm.value.minutes; 
    const hours = '*/' + this.cronJobForm.value.hours; 
    const dayOfMonth  = this.cronJobForm.value.dayOfMonth;
    const month = this.cronJobForm.value.month;
    const dayOfWeek = this.cronJobForm.value.dayOfWeek;
    this.generatedCron = this.dataservice.buildCronJob(minutes, hours, dayOfMonth, month, dayOfWeek);
  }
  genCronJob(){
    this.modalcron=false;
    if( this.selectedOption == 'DB to Store'){
    this.DbtostoreForm.setValue({
      ...this.DbtostoreForm.value,
      cron: this.generatedCron
  });
  }else if( this.selectedOption == 'Email to Webhook'){
    this.emailtowebhookForm.setValue({
      ...this.emailtowebhookForm.value,
      cron: this.generatedCron
  })
  }else if(this.selectedOption == 'SFTP to Store'){
    this.sftpForm.setValue({
      ...this.sftpForm.value,
      cron: this.generatedCron
    })
  }else if( this.selectedOption == 'Email to Store'){
    this.emailtostoreForm.setValue({
      ...this.emailtostoreForm.value,
      cron: this.generatedCron
    })
  }
  this.cronJobForm.reset();
  this.generatedCron = '';
}

}
