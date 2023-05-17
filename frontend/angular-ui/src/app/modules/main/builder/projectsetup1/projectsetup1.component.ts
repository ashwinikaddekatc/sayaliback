import { Component, OnInit } from '@angular/core';
import { ProjectSetup } from '../../../../models/builder/Project_setup';

@Component({
  selector: 'app-projectsetup1',
  templateUrl: './projectsetup1.component.html',
  styleUrls: ['./projectsetup1.component.scss']
})
export class Projectsetup1Component implements OnInit {
  gridViewIsActive: boolean = true;
  apps: Array<ProjectSetup> = [];
  constructor() { }

  ngOnInit(): void {
  }

}
