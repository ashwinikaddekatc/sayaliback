import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatastoreallComponent } from './datastoreall.component';

describe('DatastoreallComponent', () => {
  let component: DatastoreallComponent;
  let fixture: ComponentFixture<DatastoreallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatastoreallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatastoreallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
