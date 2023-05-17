import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporttypeComponent } from './reporttype.component';

describe('ReporttypeComponent', () => {
  let component: ReporttypeComponent;
  let fixture: ComponentFixture<ReporttypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporttypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporttypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
