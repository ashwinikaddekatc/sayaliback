import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobmanagementComponent } from './jobmanagement.component';

describe('JobmanagementComponent', () => {
  let component: JobmanagementComponent;
  let fixture: ComponentFixture<JobmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobmanagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
