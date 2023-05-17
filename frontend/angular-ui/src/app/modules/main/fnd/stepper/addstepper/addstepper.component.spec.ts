import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddstepperComponent } from './addstepper.component';

describe('AddstepperComponent', () => {
  let component: AddstepperComponent;
  let fixture: ComponentFixture<AddstepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddstepperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddstepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
