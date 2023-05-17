import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDashComponent } from './edit-dash.component';

describe('EditDashComponent', () => {
  let component: EditDashComponent;
  let fixture: ComponentFixture<EditDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
