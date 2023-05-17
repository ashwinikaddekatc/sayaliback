import { Component, Input, OnInit } from '@angular/core';
import {ModuleSetup} from '../../../../models/builder/Module_Setup';
import { ModulesetupService } from '../../../../services/builder/modulesetup.service';
import { ToastrService } from 'ngx-toastr';
import { WireframeService } from '../../../../services/builder/wireframe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../../../services/notification.service';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-module-card',
  templateUrl: './module-card.component.html',
  styleUrls: ['./module-card.component.scss']
})
export class ModuleCardComponent implements OnInit {
  rowSelected :any= {};

  @Input()
  apps: Array<ModuleSetup> = [];
modulesetup;
isLoading: boolean = false;
modules: ModuleSetup[];
projectId: number;
error;
search;
copymodal:boolean =false;
projectname:any;
public copyForm: FormGroup;
  constructor(  private notificationService: NotificationService,
    private mainService: ModulesetupService,
    private wireframeService: WireframeService,
    private toastr: ToastrService,
    private router: Router,
    private _fb: FormBuilder,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.wireframeService.removeModuleId();
    this.route.queryParams.subscribe(params => {
      this.projectId = +params['p_id'];
    });
    this.copyForm =this._fb.group({
      from_projectId:[null],
      from_moduleId:[null],
      to_moduleName:[null]
    })
    //this.initCopyRuleForm();
    this.wireframeService.storeProjectId(this.projectId);
    this.getProjectModules(this.projectId);
  }
  getProjectModules(id: number) {
    this.isLoading = true;
    this.mainService.getProjectModules(id).subscribe((data) => {
      this.isLoading = false;
      console.log(data);
      this.modules = data.items;
      console.log(this.modules);
      this.projectname=data.items[0]['projectName'];
      console.log(this.projectname);
      if(data.items.length == 0){
        this.error="No data Available plz add if Required";
        console.log(this.error)
    }
  },(error) => {
      console.log(error);
      if(error){
       this.error="No data Available OR server Error";
     }
    });
  }
  getData() {
    this.mainService.getAll().subscribe((data) => {
      console.log(data);
      this.modulesetup = data;
      this.modulesetup = data.items;

    });
  }

  goToAdd() {
    this.router.navigate(["../project/modules/add"], { relativeTo: this.route, queryParams: { p_id: this.projectId } });
  }
  goToAction(id: number) {
    this.router.navigate(["../actions"], { relativeTo: this.route, queryParams: { m_id: id,pname:this.projectname } });
  }
  goTocard(){
    this.router.navigate(["../modules"], { relativeTo: this.route, queryParams: { p_id: this.projectId } });
  }
  goToedit(id: number) {
    this.router.navigate(["../project/modules/edit/" + id], { relativeTo: this.route });
  }
  gotosureboard(id:any){
    console.log(id);
    this.router.navigate(["../sureboard"],{relativeTo: this.route, queryParams: { p_id: this.projectId }});
  }
  dataopen;
  opencopym(data){
    console.log(data);
    this.dataopen=data;
    this.copymodal=true;
  }
  onCreate(){
    this.copyForm.value.from_moduleId=this.dataopen.id;
  console.log(this.copyForm.value.from_moduleId);
  this.copyForm.value.from_projectId=this.projectId;
    console.log(this.copyForm.value);
  this.mainService.copy(this.copyForm.value).subscribe((data)=>{
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
}
