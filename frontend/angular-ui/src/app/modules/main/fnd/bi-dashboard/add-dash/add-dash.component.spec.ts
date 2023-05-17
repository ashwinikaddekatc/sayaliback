import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDashComponent } from './add-dash.component';

describe('AddDashComponent', () => {
  let component: AddDashComponent;
  let fixture: ComponentFixture<AddDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
