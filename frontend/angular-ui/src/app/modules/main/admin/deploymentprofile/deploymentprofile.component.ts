import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DeploymentprofileService } from 'src/app/services/admin/deploymentprofile.service';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-deploymentprofile',
  templateUrl: './deploymentprofile.component.html',
  styleUrls: ['./deploymentprofile.component.scss']
})
export class DeploymentprofileComponent implements OnInit {

  public entryForm: FormGroup;
  selected: any[] = [];
  loading = false;
  modalAdd = false;
  modaldelete = false;
  modalEdit=false;
  rowSelected :any= {};
  submitted = false;
  data;
error;
  constructor(
    private excel: ExcelService,
    private _fb: FormBuilder,
    private deploymentProfile: DeploymentprofileService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.entryForm = this._fb.group({
      profile_name:[null] ,
      end_date:[null] ,
      active_flag:[null] ,
      desc_header_table:[null] ,
      //deplomentprofilelines: this._fb.array([this.initLinesForm()]),
      deplomentprofilelines : this._fb.group({
        lines_tables:[null],
        git_url:[null] ,
        git_password:[null] ,
        git_key:[null] ,
        dokrkey:[null] ,
        deplkey:[null] ,
        dokr_username:[null] ,
        dokr_url:[null],
        git_pass:[null] ,
        depl_url:[null] ,
        depl_username:[null] ,
        depl_pass:[null] ,
      })
      });
      this.getData();
  }
  getData() {
     this.deploymentProfile.getAll().subscribe((data)=>{
       console.log("All data ",data);
       this.data = data;
       if(this.data.length==0){
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
  initLinesForm() {
    return this._fb.group({
      lines_tables:[null],
      git_url:[null] ,
      git_password:[null] ,
      git_key:[null] ,
      dokrkey:[null] ,
      deplkey:[null] ,
      dokr_username:[null] ,
      dokr_url:[null],
      git_pass:[null] ,
      depl_url:[null] ,
      depl_username:[null] ,
      depl_pass:[null] ,
    });
  }

  get controls() {
    return (this.entryForm.get("deplomentprofilelines") as FormArray).controls;
  }

  onEdit(row)
  {
    this.rowSelected = row;
    this.modalEdit = true;
    console.log("In edit method ",this.rowSelected);
  }
  onDelete(row)
  {
    this.rowSelected = row;
     this.modaldelete=true;
     console.log("Deleet method");
  }
  delete(id)
  {
    this.modaldelete = false;
    console.log("in delete  "+id);
    this.deploymentProfile.delete(id).subscribe(
      (data) => {
        console.log(data);

        this.ngOnInit();
        if (data) {
          this.toastr.success('Deleted successfully');
              }
      },(error) => {
        console.log('Error in deleting  data...',+error);
        if(error){
          this.toastr.error('Not Deleted Data Getting Some Error');
        }
      },
    );
  }

  onExport()
  {

  }
  goToAdd()
  {
      this.modalAdd = true;
  }
  onUpdate(id)
  {
      this.modalEdit = false;
      console.log("in update");
      console.log("id  "+id);
      console.log( this.rowSelected );
      this.deploymentProfile.update(id,this.rowSelected).subscribe((data) => {
          console.log(data);
          if (data) {
            this.toastr.success('Updated successfully');
                }
        },(error) => {
          console.log('Error in updating  data...',+error);
          if(error){
            this.toastr.error('Not Updated Data Getting Some Error');
          }
        }
      );
  }
  onSubmit() {
    this.submitted = true;
    if (this.entryForm.invalid) {
      return;
    }
    this.onCreate();
  }
  onCreate() {
    this.modalAdd=false;
    console.log("In add method");
    console.log(this.entryForm.value);
    this.deploymentProfile.create(this.entryForm.value).subscribe((data)=>{
      console.log(data);
      this.ngOnInit();
      if(data)
        {
          this.toastr.success('Added successfully');
        }
    },
    (error) => {
      console.log(error);
    });
  }
}
