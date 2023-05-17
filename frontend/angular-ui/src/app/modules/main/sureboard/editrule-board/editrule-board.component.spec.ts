import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditruleBoardComponent } from './editrule-board.component';

describe('EditruleBoardComponent', () => {
  let component: EditruleBoardComponent;
  let fixture: ComponentFixture<EditruleBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditruleBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditruleBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
