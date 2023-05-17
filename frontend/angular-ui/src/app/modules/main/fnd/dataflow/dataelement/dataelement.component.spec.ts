import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataelementComponent } from './dataelement.component';

describe('DataelementComponent', () => {
  let component: DataelementComponent;
  let fixture: ComponentFixture<DataelementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataelementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataelementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
