import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActiveTechnology } from 'src/app/models/builder/ActiveTechnology';
import { TechnologyStackService } from 'src/app/services/builder/technology-stack.service';
import { ModuleSetup } from '../../../../../models/builder/Module_Setup';
//import { ValidationError } from '../../../../models/ValidationError';
import { ModulesetupService } from '../../../../../services/builder/modulesetup.service';
@Component({
  selector: 'app-editmodule-setup',
  templateUrl: './editmodule-setup.component.html',
  styleUrls: ['./editmodule-setup.component.scss']
})
export class EditmoduleSetupComponent implements OnInit {
  updated = false;
  module;
  id: number;
  projectId: number;
  arrayTag=[];
  //fieldErors: ValidationError[] = []; // backend validation field error message
error;
modules;
  tech_stacks = [];
  constructor( private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,private technologyStackService: TechnologyStackService,
    private moduleSetupService: ModulesetupService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.projectId = +params['p_id'];

      console.log(this.projectId)
    });
    console.log("project id",this.projectId)

    this.module = new ModuleSetup();
    this.id = this.route.snapshot.params["id"];
    console.log("update with id = ", this.id);
    this.getById(this.id);
    this.getProjectModules(this.id);
    this.technologyStackService.getAll().subscribe((data) => {
      console.log(data)
      this.tech_stacks=data;
    });
    this.activeTechnologyDropdown();
  }
  getProjectModules(id: number) {
    // this.isLoading = true;
     this.moduleSetupService.getProjectModules(id).subscribe((data) => {
      // this.isLoading = false;
       console.log(data);
       this.modules = data.items;
       console.log(this.modules);
  //this.projectname=data.items[0]['projectName'];
  //console.log(this.projectname);
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
  getById(id: number) {
    this.moduleSetupService.getById(id).subscribe(
      (data) => {
        this.module = data;
        console.log('Module : ', this.module);
        this.arrayTag = JSON.parse(this.module.tags);
        console.log("array tag data ", this.arrayTag);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  activeTechnologyDropDown: ActiveTechnology[];
  activeTechnologyDropdown() {
    this.technologyStackService.getActiveTechnology().subscribe((data) => {
      console.log(data);
      this.activeTechnologyDropDown = data;
    });
  }
  update() {
    console.log(this.module);
    this.moduleSetupService.update(this.id, this.module).subscribe(
      (data) => {
        console.log(data);


        this.router.navigate(["../../../../modules"],{ relativeTo: this.route, queryParams: { p_id: this.projectId } });
      },
      // (error) => {
      //   console.log(error);
      //   const objectArray = Object.entries(error.error.fieldErrors);
      //   objectArray.forEach(([k, v]) => {
      //     console.log(k);
      //     console.log(v);
      //     this.fieldErors.push({ field: k, message: v });
      //   });
        //console.log(this.fieldErors); // this will come from backend
      // }


    );

    if (this.id) {
      this.toastr.success('Updated successfully');
          }

  }

  onSubmit() {
    this.updated = true;
    this.update();
  }

  back() {
    this.router.navigate(["../../all"], { relativeTo: this.route });
  }
}
