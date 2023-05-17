import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConnectorMappingService } from 'src/app/services/admin/connector-mapping.service';
import {SureConnectorService} from 'src/app/services/admin/sure-connector.service';
@Component({
  selector: 'app-sure-connector',
  templateUrl: './sure-connector.component.html',
  styleUrls: ['./sure-connector.component.scss']
})
export class SureConnectorComponent implements OnInit {

  loading = false;
  data;
  selected: any[] = [];
  modalAdd= false;
  modaldelete=false;
  modaledit=false;
  rowSelected :any= {};
  public entryForm: FormGroup;
  error;
alldata;
  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private sureservice:SureConnectorService,
    private connectorService: ConnectorMappingService,
  ) { }

  ngOnInit(): void {

    this.entryForm = this._fb.group({
      sequence:[null] ,
      connection:[null] ,
      method:[null],
      api:[null],
      json_mapper:[null]
      });

      this.connectorService.getAll().subscribe((data)=>{
        console.log("connector table ",data);
        this.data = data;

      });
this.getall();
  }
getall(){
  this.sureservice.getAll().subscribe((data)=>{
    this.alldata=data ;
  console.log(this.alldata);
  if(this.alldata.length==0){
    this.error="No data Available";
    console.log(this.error)
  }
  })
}
  goToAddMapper(){
    this.router.navigate(["../connectormapping/add"],{relativeTo:this.route});
  }
  goToAdd(){
      //console.log('modal add true');
      this.modalAdd = true;

  }
  onSubmit(){
this.sureservice.create(this.entryForm.value).subscribe((data)=>{
  console.log(data);
  if (data) {
    this.toastr.success('Added successfully');
          }
}, (error) => {
  console.log('Error in adding data...',+error);
    if(error){
      this.toastr.error('Not added Data Getting Some Error');
    }
});
this.modalAdd=false;
  }
  onDelete(row) {
    this.rowSelected = row;
     this.modaldelete=true;
  }

  delete(id)
  {
    this.modaldelete = false;
    console.log("in delete  "+id);
    this.sureservice.delete(id).subscribe((data) => {
        console.log(data);
        this.ngOnInit();
        if (data) {
          this.toastr.success('Deleted successfully');
              }
     },);
      }
      onEdit(row) {
        this.rowSelected = row;
        this.modaledit = true;
      }
      onUpdate(id) {
        this.modaledit = false;
       console.log("id  "+id);
        console.log( this.rowSelected );
        this.sureservice.update(id,this.rowSelected).subscribe((data) => {
            console.log(data);
            if (data) {
              this.toastr.success('Updated successfully');
                    }
            },);


    }
}
