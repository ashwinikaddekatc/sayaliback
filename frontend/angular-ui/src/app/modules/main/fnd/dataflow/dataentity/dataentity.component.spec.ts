import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataentityComponent } from './dataentity.component';

describe('DataentityComponent', () => {
  let component: DataentityComponent;
  let fixture: ComponentFixture<DataentityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataentityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
