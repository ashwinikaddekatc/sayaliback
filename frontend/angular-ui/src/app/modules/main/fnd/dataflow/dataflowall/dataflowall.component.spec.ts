import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataflowallComponent } from './dataflowall.component';

describe('DataflowallComponent', () => {
  let component: DataflowallComponent;
  let fixture: ComponentFixture<DataflowallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataflowallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataflowallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
