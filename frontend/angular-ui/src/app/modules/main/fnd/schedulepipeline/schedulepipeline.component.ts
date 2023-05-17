import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConnectorMappingService } from 'src/app/services/admin/connector-mapping.service';
import {SchedulerService} from '../../../../services/fnd/scheduler.service';
import { HttpHeaderResponse } from '@angular/common/http';

@Component({
  selector: 'app-schedulepipeline',
  templateUrl: './schedulepipeline.component.html',
  styleUrls: ['./schedulepipeline.component.scss']
})
export class SchedulepipelineComponent implements OnInit {
  modalAdd= false;
  modaledit=false;
  public entryForm: FormGroup;
  alldata;
  loading = false;
  error;
  data;
  selected: any[] = [];
  rowSelected :any= {};
  selectedOption = "JobPro";
  datagridOptions = ["JobPro","SureOps", "Registrations","Communication","Webhook"];
  registrationData;
  sureopsData;
  communicationData;
  webhookData;
  dataRefreshInterval: any;
  ResponseModal = false;
  JsonModal = false;
  constructor( private mainservice:SchedulerService,
    private connectorService: ConnectorMappingService,
    private _fb: FormBuilder,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.getData();

    this.entryForm = this._fb.group({
      accountId:[null] ,
      parameters:[null] ,
      url:[null],
      method:[null],
      connection_name:[null]
      });
  }
  ngOnDestroy() {
    // Clean up the interval subscription
    clearInterval(this.dataRefreshInterval);
    console.log("clear Interval");
  }

  getData(){
    this.dataRefreshInterval = setInterval(() => {
    this.mainservice.getAllpipe().subscribe((data) => {
      // console.log(data);
      this.alldata = data;
      if(this.alldata.length==0){
        this.error="No data Available";
        // console.log(this.error)
      }
    },(error) => {
      console.log(error);
      if(error){
       this.error="Server Error";
       clearInterval(this.dataRefreshInterval);
     }
    });
  }, 5000);
  }
  goToAdd() {
    this.modalAdd=true;
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
    onSubmit(){
      this.modalAdd=false;
      console.log(this.entryForm.value);
      //this.entryForm.value.connection_name=this.menuselectid;
      this.mainservice.createpipe(this.entryForm.value).subscribe(data => {
        console.log(data)
        if (data) {
          this.toastr.success('Added successfully');
       }
        // if(data.operationMessage=='Your Access is Denied Plz contact Admin'){
        //   this.toastr.error('Your Access is Denied Plz contact Admin');
        //  }
        this.ngOnInit();
      },
        (error) => {
          console.log(error);
          if(error){
            this.toastr.error('Not added Data Getting Some Error');
          }
        }
      );
    }
    modalEdit(row){
      this.rowSelected=row;
      console.log(this.rowSelected);
      this.modaledit=true;
      this.getallconnector();
      }
      onUpdate(id:any){
        this.modaledit=false;
        console.log(id);
        this.mainservice.updatepipe(this.rowSelected).subscribe((data)=>{
          console.log(data);
          if (data) {
            this.toastr.success('Updated successfully');
                }
        }, (error) => {
          console.log('Error in adding data...',+error);
            if(error){
              this.toastr.error('Not Updated Data Getting Some Error');
            }
        });
      }
      menuselectid;
      idselected(val){
        console.log(val)
        this.menuselectid=val;
      }
      choosedGrid;
      choose(val){
        this.choosedGrid=val;
        if(val == this.datagridOptions[2])
        {
          this.registrations();
        }
        if(val == this.datagridOptions[1])
        {
          this.sureOps();
        }
        if(val == this.datagridOptions[3])
        {
          this.communication();
        }
        if(val == this.datagridOptions[4])
        {
          this.webhook();
        }
      }

      registrations(){
        this.mainservice.getAllRegistrations().subscribe((data) => {
          console.log(data);
          this.registrationData = data;
          if(this.registrationData.length==0){
            this.error=" data is empty";
            console.log(this.error);
          }
        },(error:HttpHeaderResponse) => {
          console.log(error);
          if(error.status === 401){
            console.log("server error")
           this.error="Server Error";
         }if(error.status === 200){
            console.log("data get successful")
         }
        });
      }

      sureOps(){
        this.mainservice.getAllSureOps().subscribe((data) => {
          console.log(data);
          this.sureopsData = data;
          if(this.sureopsData.length==0){
            this.error="No data Available";
            console.log(this.error)
          }
        },(error) => {
          console.log(error);
          if(error){
           this.error="Server Error";
         }
        });
      }

      communication(){
        this.mainservice.getAllCommunication().subscribe((data) => {
          console.log(data);
          this.communicationData = data;
          if(this.communicationData.length==0){
            this.error="No data Available";
            console.log(this.error);
          }
        },(error) => {
            console.log(error);
            if(error){
              this.error="Server Error";
            }
        });
      }

      webhook(){
        this.mainservice.getAllwebhook().subscribe((data) => {
          console.log(data);
          this.webhookData = data;
          if(this.webhookData.length==0){
            this.error="No data Available";
            console.log(this.error);
          }
        },(error) => {
          console.log(error);
          if(error){
            this.error="Server Error";
          }
        });
      }

      goToCurJson(row){
        this.rowSelected = row;
        this.JsonModal = true;
      }

      goToResponse(row){
        this.rowSelected = row;
        this.ResponseModal = true;
      }
}
