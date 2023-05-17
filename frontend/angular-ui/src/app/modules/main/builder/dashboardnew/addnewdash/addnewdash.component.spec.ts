import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewdashComponent } from './addnewdash.component';

describe('AddnewdashComponent', () => {
  let component: AddnewdashComponent;
  let fixture: ComponentFixture<AddnewdashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnewdashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
