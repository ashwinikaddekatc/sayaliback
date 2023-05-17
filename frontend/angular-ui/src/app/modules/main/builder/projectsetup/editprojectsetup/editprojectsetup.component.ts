import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { ActiveTechnology } from "../../../../../models/builder/ActiveTechnology";
import { ProjectSetup } from "../../../../../models/builder/Project_setup";
//import { ValidationError } from '../../../../models/ValidationError';
import { DropdownService } from '../../../../../services/builder/dropdown.service';
import { ProjectSetupService } from "../../../../../services/builder/project-setup.service";
import { TechnologyStackService } from "../../../../../services/builder/technology-stack.service";
@Component({
  selector: 'app-editprojectsetup',
  templateUrl: './editprojectsetup.component.html',
  styleUrls: ['./editprojectsetup.component.scss']
})
export class EditprojectsetupComponent implements OnInit {
  updated = false;
  project: ProjectSetup;
  info: boolean = false;
  id: number;
  tech_stacks = [];
  arrayTag = [];
  arrayaccess = [];
  //errorFields: ValidationError[] = [];
  constructor(private router: Router,
    private route: ActivatedRoute,
    private projectSetupService: ProjectSetupService,
    private technologyStackService: TechnologyStackService,
    private dropdownService: DropdownService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.project = new ProjectSetup();
    this.activeTechnologyDropdown();

    this.id = this.route.snapshot.params["id"];
    console.log("update with id = ", this.id);
    this.getById(this.id);

    //for dynamic tech stack
    this.technologyStackService.getAll().subscribe((data) => {
      console.log(data)
      this.tech_stacks=data;
      // for (let ts of data.items) {
      //   if (ts.tech_stack == null) {
      //     return;
      //   }
      //   console.warn(ts.tech_stack);

      //   this.tech_stacks.push(ts.tech_stack)

      // }
    });
  }
  goToWhoColumns() {
    this.info = !this.info;
}
  getById(id: number) {
    this.projectSetupService.getById(id).subscribe(
      (data) => {
        this.project = data;
        console.log(this.project)
        this.arrayTag = JSON.parse(data.tags);
        this.arrayaccess = JSON.parse(data.category);
        console.log("array tag data ", this.arrayTag);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  update() {
    console.log(this.id, this.project)
    let tagArray = JSON.stringify(this.arrayTag);
    this.project.tags = tagArray
   // this.project.tags = JSON.stringify(this.arrayTag);
    console.log(this.project.tags);
    this.project.category = JSON.stringify(this.arrayaccess);
    console.log(this.project.category);
    this.project.accessibility = this.setvalue;
    this.projectSetupService.update(this.id, this.project).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(["../../../project/all"], { relativeTo: this.route });
        if (data.body) {
          this.toastr.success('Updated successfully');
        }
      },
      (error) => {
        console.log('Error in adding data...', +error);
        if (error) {
          this.toastr.error('Not Updated Data Getting Some Error');
        }
      }
    );

  }

  onSubmit() {
    this.updated = true;
    this.update();
  }


  activeTechnologyDropDown: ActiveTechnology[];
  activeTechnologyDropdown() {
    this.technologyStackService.getActiveTechnology().subscribe((data) => {
      console.log(data);
      this.activeTechnologyDropDown = data;
    });
  }

  back() {
    this.router.navigate(["../../all"], { relativeTo: this.route });
  }
  setvalue;
  changeGender(e) {
    console.log(e.target.value);
    this.setvalue = e.target.value;
    console.log(this.setvalue);
  }
}
