import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BiWidgetSetupService } from 'src/app/services/fnd/bi-widget-setup.service';
@Component({
  selector: 'app-edit-widgets',
  templateUrl: './edit-widgets.component.html',
  styleUrls: ['./edit-widgets.component.scss']
})
export class EditWidgetsComponent implements OnInit {
  id:number;
  widget;

  chart_types = [
    "bar-chart",
    "line-chart",
    "pie-chart",
    "polar-chart",
    "radar-chart",
    "doughnut-chart",
    "bar-chart-horizontal"
  ];
  color_scheme=[
    "BPGR",
    "RGBP"
  ]
  constructor(private router: Router,
    private route: ActivatedRoute,
    private widgetService: BiWidgetSetupService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    console.log(this.id);

    this.widgetService.getwidgetbyid(this.id).subscribe((data)=>{
      console.log(data);
      this.widget=data

    })
  }
  onSubmit()
  {
    console.log(this.widget);
    this.widgetService.updatewidgetbyid(this.id,this.widget).subscribe((data)=>{
      console.log("updateddata ",data);
      this.router.navigate(["/../../../bi-widgets/all"], { relativeTo: this.route});

    })

  }
}
