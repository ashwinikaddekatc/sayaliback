import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerlogreadfileComponent } from './schedulerlogreadfile.component';

describe('SchedulerlogreadfileComponent', () => {
  let component: SchedulerlogreadfileComponent;
  let fixture: ComponentFixture<SchedulerlogreadfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulerlogreadfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulerlogreadfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
