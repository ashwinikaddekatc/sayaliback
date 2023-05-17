import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulepipelineComponent } from './schedulepipeline.component';

describe('SchedulepipelineComponent', () => {
  let component: SchedulepipelineComponent;
  let fixture: ComponentFixture<SchedulepipelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulepipelineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulepipelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
