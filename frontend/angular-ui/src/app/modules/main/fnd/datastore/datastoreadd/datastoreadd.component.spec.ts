import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatastoreaddComponent } from './datastoreadd.component';

describe('DatastoreaddComponent', () => {
  let component: DatastoreaddComponent;
  let fixture: ComponentFixture<DatastoreaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatastoreaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatastoreaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
