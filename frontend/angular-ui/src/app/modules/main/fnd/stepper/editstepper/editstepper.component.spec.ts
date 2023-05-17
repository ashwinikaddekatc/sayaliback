import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditstepperComponent } from './editstepper.component';

describe('EditstepperComponent', () => {
  let component: EditstepperComponent;
  let fixture: ComponentFixture<EditstepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditstepperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditstepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
