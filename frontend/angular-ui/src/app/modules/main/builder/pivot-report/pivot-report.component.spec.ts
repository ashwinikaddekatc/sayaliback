import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PivotReportComponent } from './pivot-report.component';

describe('PivotReportComponent', () => {
  let component: PivotReportComponent;
  let fixture: ComponentFixture<PivotReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PivotReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PivotReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
