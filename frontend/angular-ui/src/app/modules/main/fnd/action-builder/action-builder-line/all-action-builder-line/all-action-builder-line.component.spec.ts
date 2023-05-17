import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllActionBuilderLineComponent } from './all-action-builder-line.component';

describe('AllActionBuilderLineComponent', () => {
  let component: AllActionBuilderLineComponent;
  let fixture: ComponentFixture<AllActionBuilderLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllActionBuilderLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllActionBuilderLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
