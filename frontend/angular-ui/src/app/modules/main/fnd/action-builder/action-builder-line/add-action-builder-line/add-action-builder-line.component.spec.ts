import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddActionBuilderLineComponent } from './add-action-builder-line.component';

describe('AddActionBuilderLineComponent', () => {
  let component: AddActionBuilderLineComponent;
  let fixture: ComponentFixture<AddActionBuilderLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddActionBuilderLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddActionBuilderLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
