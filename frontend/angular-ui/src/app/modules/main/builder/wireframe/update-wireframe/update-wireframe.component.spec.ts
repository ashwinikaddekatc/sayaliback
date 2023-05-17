import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWireframeComponent } from './update-wireframe.component';

describe('UpdateWireframeComponent', () => {
  let component: UpdateWireframeComponent;
  let fixture: ComponentFixture<UpdateWireframeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateWireframeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateWireframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
