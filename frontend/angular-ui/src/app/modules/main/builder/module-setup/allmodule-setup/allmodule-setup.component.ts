import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ModuleSetup } from '../../../../../models/builder/Module_Setup';
import { AlertService } from '../../../../../services/alert.service';
import { ModulesetupService } from '../../../../../services/builder/modulesetup.service';
import { ProjectSetupService } from '../../../../../services/builder/project-setup.service';
import { WireframeService } from '../../../../../services/builder/wireframe.service';
import { ExcelService } from '../../../../../services/excel.service';
@Component({
  selector: 'app-allmodule-setup',
  templateUrl: './allmodule-setup.component.html',
  styleUrls: ['./allmodule-setup.component.scss']
})
export class AllmoduleSetupComponent implements OnInit {
  @ViewChild("getById") getById: TemplateRef<any>;
  @ViewChild("txId") txId: TemplateRef<any>;
  selected: any[] = [];
  rowSelected :any= {};
  modaldelete=false;
  modaladd=false;


  module;
  basic: boolean = false;
  columns: any[];
  rows: any[];
  temp = [];
  isLoading: boolean = false;
  modules: ModuleSetup[];
  loading = false;
  // copy rules
  tech_stacks = ['SpringMVC-Hibernate-Mysql', 'Angular-SpringBoot-Mysql', 'React-ReactNative-Mysql', 'React-ReactNative-MongoDB', 'Angular-SpringBoot-MongoDB', 'Php-Laravel-Mysql', 'MEAN'];
  object_types = ['form', 'bi', 'report', 'api'];
  sub_object_types = ['only header', 'only line', 'header line', 'header multiline', 'wrokflow', 'setup', 'std report', 'bi report', 'rest api'];
  projectId: number;
  projectname:any;
  project;
  error;
  // tools1 = [
  //   {

  //     title: "Start from scratch",
  //     action: "../project/modules/add",
  //    //link: this.gotoadd()
  //   },
  //   {
  //     title: "import from Templates",
  //     action: "../create-table",
  //   },
  //  {
  //     title: "Import from  public project",
  //     action: "../dashboard",
  //   },
  // ];
  constructor( private _fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private excel: ExcelService,
    private moduleSetupService: ModulesetupService,
    private projectSetupService: ProjectSetupService,
    private alertService: AlertService,
    private wireframeService: WireframeService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.wireframeService.removeModuleId();
    this.route.queryParams.subscribe(params => {
      this.projectId = +params['p_id'];

    });

    //this.initCopyRuleForm();
    this.getProjectModules(this.projectId);
  }
  getProjectModules(id: number) {
    this.isLoading = true;
    this.moduleSetupService.getProjectModules(id).subscribe((data) => {
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
       this.error="Server Error";
     }
    });
  }
  onDelete(row) {
    this.rowSelected = row;
     this.modaldelete=true;
  }

  delete(id)
  {
    this.modaldelete = false;
    console.log("in delete  "+id);
    this.moduleSetupService.delete(id).subscribe(
      (data) => {
        console.log(data);
        this.ngOnInit();
      },
    );
    if (id) {
      this.toastr.success('Deleted successfully');
          }

  }
  goToAdd() {
    this.modaladd=true;
    //this.router.navigate(["../project/modules/add"], { relativeTo: this.route, queryParams: { p_id: this.projectId } });
  }
  gotoadd(){
    this.router.navigate(["../project/modules/add"], { relativeTo: this.route, queryParams: { p_id: this.projectId } });
  }
  goToEdit(id: number) {
    this.router.navigate(["../project/modules/edit/" + id], { relativeTo: this.route ,queryParams: { p_id: this.projectId }});
  }
  onExport() {
    this.excel.exportAsExcelFile(this.module, 'user_',
      moment().format('YYYYMMDD_HHmmss'))
  }
  goToAction(id: number) {
    this.router.navigate(["../actions"], { relativeTo: this.route, queryParams: { m_id: id,pname:this.projectname } });
  }
  goTocard(){
   // this.router.navigate(["../modulecard"], { relativeTo: this.route });
    this.router.navigate(["../modulecard"], { relativeTo: this.route, queryParams: { p_id: this.projectId } });
  }
  goTproject(){
   // this.router.navigate(["../projectview"], { relativeTo: this.route,  });
    if (document.getElementById('Div1')) {

      if (document.getElementById('Div1').style.display == 'none') {
          document.getElementById('Div1').style.display = 'block';
          document.getElementById('Div2').style.display = 'none';


      }
      else {
          document.getElementById('Div1').style.display = 'none';
          document.getElementById('Div2').style.display = 'block';

      }
  }
  }
  goTorepo(){
    if (document.getElementById('Div2')) {

      if (document.getElementById('Div2').style.display == 'none') {
          document.getElementById('Div2').style.display = 'block';
          document.getElementById('Div1').style.display = 'none';



      }
      else {
          document.getElementById('Div2').style.display = 'none';
          document.getElementById('Div1').style.display = 'block';

      }
  }
  }

}
