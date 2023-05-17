import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataflowaddComponent } from './dataflowadd.component';

describe('DataflowaddComponent', () => {
  let component: DataflowaddComponent;
  let fixture: ComponentFixture<DataflowaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataflowaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataflowaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
