import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataflowComponent } from './dataflow.component';

describe('DataflowComponent', () => {
  let component: DataflowComponent;
  let fixture: ComponentFixture<DataflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataflowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
