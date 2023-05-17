import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LinebuilderService } from 'src/app/services/builder/linebuilder.service';
import { TechnologyStackService } from 'src/app/services/builder/technology-stack.service';

@Component({
  selector: 'app-listbuilderedit',
  templateUrl: './listbuilderedit.component.html',
  styleUrls: ['./listbuilderedit.component.scss']
})
export class ListbuildereditComponent implements OnInit {
  updated = false;
  lineBuilder_Header;
  id: number;
  tech_stacks=[];
  constructor(private router: Router,
    private route: ActivatedRoute,private listBuilder:LinebuilderService,private technologyStackService:TechnologyStackService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    console.log("update with id = ", this.id);
    this.getById(this.id);
    this.technologyStackService.getAll().subscribe((data)=>{
      console.log(data)
    this.tech_stacks=data;
  });
  }

  getById(id: number) {
    this.listBuilder.getDetailsById(id).subscribe(
      (data) => {
        console.log(data);
        this.lineBuilder_Header = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  update() {
    this.listBuilder.updateHeader(this.lineBuilder_Header).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(["../../all"], { relativeTo: this.route });
        //this.router.navigate(["../../all"],{ relativeTo: this.route, queryParams: { p_id: this.projectId } });
      },
      (error) => {
        // console.log(error);
        // const objectArray = Object.entries(error.error.fieldErrors);
        // objectArray.forEach(([k, v]) => {
        //   console.log(k);
        //   console.log(v);
        //   this.fieldErors.push({ field: k, message: v });
        // });
        console.log(error); // this will come from backend
      }
    );
    // this.lineBuilder_Header = new Rn_Cff_ActionBuilder_Header();
  }

  onSubmit() {
    this.updated = true;
    this.update();
  }

  back() {
    this.router.navigate(["../../all"], { relativeTo: this.route });
  }

}
