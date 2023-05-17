import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddDefinationService } from 'src/app/services/fnd/add-defination.service';
@Component({
  selector: 'app-add-defination',
  templateUrl: './add-defination.component.html',
  styleUrls: ['./add-defination.component.scss']
})
export class AddDefinationComponent implements OnInit {
  id:number;
  moduleId:number;
  widget1:String;
  widget2:String;

  widget3:String;
  widget4:String;
  widget5:String;
  widget6:String;
  section_type:String;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private addDefService: AddDefinationService,) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    console.log("new id",this.id);
    this.getWidgets();
  }
  getWidgets(){
    this.addDefService.getById(this.id).subscribe((data) => {
      console.log("Section type:",data.section_type);
      console.log("Section type:",data.widgets1);
      this.widget1=data.widgets1;
      this.widget2=data.widgets2;
      this.widget3=data.widgets3;
      this.widget4=data.widgets4;
      this.widget5=data.widgets5;
      this.widget6=data.widgets6;
      this.section_type=data.section_type;
      });
  }

  onWidget(name:string){
    console.log("Name value:",name);
    this.router.navigate(["../../update-modal/"+this.id+"/"+name], { relativeTo: this.route });
  }


}
