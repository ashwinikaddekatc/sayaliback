import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Edit2wireframeComponent } from './edit2wireframe.component';

describe('Edit2wireframeComponent', () => {
  let component: Edit2wireframeComponent;
  let fixture: ComponentFixture<Edit2wireframeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Edit2wireframeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Edit2wireframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
