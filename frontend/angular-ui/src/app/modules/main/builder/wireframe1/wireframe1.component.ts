import { Component, OnInit } from '@angular/core';
import { Rn_Fb_Header } from '../../../../models/builder/Rn_Fb_Header';

@Component({
  selector: 'app-wireframe1',
  templateUrl: './wireframe1.component.html',
  styleUrls: ['./wireframe1.component.scss']
})
export class Wireframe1Component implements OnInit {
  gridViewIsActive: boolean = true;
  apps: Array<Rn_Fb_Header> = [];
  constructor() { }

  ngOnInit(): void {
  }

}
