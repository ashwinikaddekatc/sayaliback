import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RbDateParamSetupComponent } from './rb-date-param-setup.component';

describe('RbDateParamSetupComponent', () => {
  let component: RbDateParamSetupComponent;
  let fixture: ComponentFixture<RbDateParamSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RbDateParamSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RbDateParamSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
