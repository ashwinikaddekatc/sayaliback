import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BiDashLine } from 'src/app/models/fnd/BiDashLine';
import { BiDashHeader } from 'src/app/models/fnd/BiDashHeader';
import { BiDashSetupService } from 'src/app/services/fnd/bi-dash-setup.service';
@Component({
  selector: 'app-edit-dash',
  templateUrl: './edit-dash.component.html',
  styleUrls: ['./edit-dash.component.scss']
})
export class EditDashComponent implements OnInit {
  id:number;
  components:BiDashLine[];
  rn_dash_header:BiDashHeader;
  fieldErrors:any;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private dashService: BiDashSetupService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    console.log("update with id = ", this.id);
    this.rn_dash_header=new BiDashHeader();
    this.getById(this.id);
  }
  getById(id: number) {
    this.dashService.getById(id).subscribe((data) => {
      this.rn_dash_header = data;
      this.components = data.components;
      console.log('component length = ', this.components.length.toString());
    });
  }

  onAddLines() {
    /* (<FormArray>this.entryForm.get("components")).push(this.initLinesForm()); */
  }

  onCliclLine(id:number){
    console.log("Id print:",id);
    this.router.navigate(["../../add-def/"+id], {relativeTo: this.route });

  }

  BuildDash(){
    console.log("id in build report:",this.id);
    this.dashService.buildDash(this.id).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  onRemoveLines(i){}
onSubmit(){}
}
