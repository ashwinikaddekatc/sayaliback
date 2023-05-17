import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineFieldComponent } from './line-field.component';

describe('LineFieldComponent', () => {
  let component: LineFieldComponent;
  let fixture: ComponentFixture<LineFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
