import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllstepperComponent } from './allstepper.component';

describe('AllstepperComponent', () => {
  let component: AllstepperComponent;
  let fixture: ComponentFixture<AllstepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllstepperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllstepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
