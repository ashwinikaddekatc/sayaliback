import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectSetupService } from 'src/app/services/builder/project-setup.service';
import { ModuleSetup } from '../../../../models/builder/Module_Setup';
import { ModulesetupService } from '../../../../services/builder/modulesetup.service';
import { WireframeService } from '../../../../services/builder/wireframe.service';
import { NotificationService } from '../../../../services/notification.service';

@Component({
  selector: 'app-module-setup1',
  templateUrl: './module-setup1.component.html',
  styleUrls: ['./module-setup1.component.scss']
})
export class ModuleSetup1Component implements OnInit {
  gridViewIsActive: boolean = true;
  apps: Array<ModuleSetup> = [];
  projectId: any;
  isLoading: boolean = false;
  modules: ModuleSetup[];
  project;
  projectname;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private mainService: ModulesetupService, private projectSetupService: ProjectSetupService,
    private wireframeService: WireframeService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.wireframeService.removeModuleId();
    this.route.queryParams.subscribe(params => {
      this.projectId = +params['pid'];
      console.log(this.projectId);
    });
this.getById(this.projectId);
    //this.initCopyRuleForm();
    this.getProjectModules(this.projectId);
  }
  getById(id: number) {
    this.projectSetupService.getById(id).subscribe(
      (data) => {
        this.project = data;
        console.log(this.project)
this.projectname=this.project.projectName;
console.log(this.projectname);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getProjectModules(id: number) {
    this.isLoading = true;
    this.mainService.getProjectModules(id).subscribe((data) => {
      this.isLoading = false;
      console.log(data);
      this.modules = data.items;

    });
  }
suregit(){
  this.router.navigate(["../suregit"], { relativeTo: this.route });

}
goToAdd() {
  this.router.navigate(["../project/modules/add"], { relativeTo: this.route, queryParams: { p_id: this.projectId } });
}
}
