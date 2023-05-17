import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllmoduleSetupComponent } from './allmodule-setup.component';

describe('AllmoduleSetupComponent', () => {
  let component: AllmoduleSetupComponent;
  let fixture: ComponentFixture<AllmoduleSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllmoduleSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllmoduleSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
