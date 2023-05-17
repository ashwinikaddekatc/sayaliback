import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModulesetupService } from '../../../../services/builder/modulesetup.service';
import { WireframeService } from '../../../../services/builder/wireframe.service';
import { ExcelService } from '../../../../services/excel.service';
import { Rn_Fb_Header } from '../../../../models/builder/Rn_Fb_Header';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-wireframe-card',
  templateUrl: './wireframe-card.component.html',
  styleUrls: ['./wireframe-card.component.scss']
})
export class WireframeCardComponent implements OnInit {
  moduleId: number;
  wireFrames: Rn_Fb_Header[];
  isLoading: boolean = false;
  projectid;
  search;
  copymodal:boolean =false;
  modaledit: boolean = false;
  rowSelected: any = {};
  public copyForm:FormGroup;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private excel: ExcelService,
    private _fb: FormBuilder,
    private moduleService: ModulesetupService,
    private toastr: ToastrService,
    private wireframeService: WireframeService,) { }

  ngOnInit(): void {
    this.moduleId = this.wireframeService.getModuleId(); // get from session storage
    console.log("ModuleID",this.moduleId);
    this.projectid=this.wireframeService.getProjectId();
    console.log("projectID",this.projectid);
    this.getModuleWireframes(this.moduleId);
    this.copyForm =this._fb.group({
      from_projectId:[null],
      from_moduleId:[null],
      from_WireFrameId:[null],
      to_uiName:[null]
    })
  }
  getModuleWireframes(id: number) {
    this.isLoading = true;
    //this.moduleService.getById(id).subscribe((data) => {
      this.wireframeService.getAll(id).subscribe((data) => {
      this.isLoading = false;
      console.log(data);
      //this.wireFrames = data.rn_fb_headers;
      this.wireFrames = data.items;
      console.log('wireframes: ', this.wireFrames);

    });
  }
  goToAdd() {
    this.router.navigate(["../project/modules/wireframe/types"], { relativeTo: this.route });
  }
  goTocard(){
    this.router.navigate(["/cns-portal/wireframe"]);
  }
  
  dataopen;
  opencopym(data){
    console.log(data);
    this.dataopen=data;
    this.copymodal=true;
  }
  onCreate(){
    this.copyForm.value.from_moduleId=this.moduleId;
  console.log(this.copyForm.value.from_moduleId);
  this.copyForm.value.from_projectId=this.projectid;
        this.copyForm.value.from_WireFrameId=this.dataopen.id;
    console.log(this.copyForm.value);
  this.wireframeService.copy(this.copyForm.value).subscribe((data)=>{
    console.log(data);
    if (data) {
      this.toastr.success('Copied successfully');
          }
  },(error) => {
    console.log('Error in adding data...',+error);
      if(error){
        this.toastr.error('Not Copied Data Getting Some Error');
      }
  });
  this.copymodal=false;
  }

  goToedit(row) {

    this.rowSelected = row;
    this.modaledit = true;
  }
  updatewirecard(id){
    this.modaledit = false;
    console.log("id  "+id);
      console.log( this.rowSelected );
      //console.log("out update");
      this.wireframeService.editWireframeCard(id,this.rowSelected).subscribe(
        (data) => {
          console.log(data);
          if(data){
            this.toastr.success('Updated successfully');
          }
        },(err) => {
          console.log(err);
          this.toastr.error('Updated Unsuccessfully');
        });
      // if (id) {
      //   this.toastr.success('Updated successfully');
      //         }
  }
}
