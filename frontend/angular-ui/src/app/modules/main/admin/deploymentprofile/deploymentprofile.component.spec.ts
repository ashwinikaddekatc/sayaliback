import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeploymentprofileComponent } from './deploymentprofile.component';

describe('DeploymentprofileComponent', () => {
  let component: DeploymentprofileComponent;
  let fixture: ComponentFixture<DeploymentprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeploymentprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeploymentprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
