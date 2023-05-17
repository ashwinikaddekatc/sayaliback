import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllWidgetComponent } from './all-widget.component';

describe('AllWidgetComponent', () => {
  let component: AllWidgetComponent;
  let fixture: ComponentFixture<AllWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
