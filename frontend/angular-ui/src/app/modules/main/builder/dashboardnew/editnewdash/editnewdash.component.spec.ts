import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditnewdashComponent } from './editnewdash.component';

describe('EditnewdashComponent', () => {
  let component: EditnewdashComponent;
  let fixture: ComponentFixture<EditnewdashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditnewdashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditnewdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
