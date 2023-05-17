import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RbAdhocParamSetupComponent } from './rb-adhoc-param-setup.component';

describe('RbAdhocParamSetupComponent', () => {
  let component: RbAdhocParamSetupComponent;
  let fixture: ComponentFixture<RbAdhocParamSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RbAdhocParamSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RbAdhocParamSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
