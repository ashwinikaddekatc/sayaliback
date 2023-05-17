import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllworkflowComponent } from './allworkflow.component';

describe('AllworkflowComponent', () => {
  let component: AllworkflowComponent;
  let fixture: ComponentFixture<AllworkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllworkflowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllworkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
