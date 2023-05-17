import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDashComponent } from './all-dash.component';

describe('AllDashComponent', () => {
  let component: AllDashComponent;
  let fixture: ComponentFixture<AllDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
