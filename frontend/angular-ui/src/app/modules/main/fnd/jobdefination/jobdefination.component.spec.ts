import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobdefinationComponent } from './jobdefination.component';

describe('JobdefinationComponent', () => {
  let component: JobdefinationComponent;
  let fixture: ComponentFixture<JobdefinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobdefinationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobdefinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
