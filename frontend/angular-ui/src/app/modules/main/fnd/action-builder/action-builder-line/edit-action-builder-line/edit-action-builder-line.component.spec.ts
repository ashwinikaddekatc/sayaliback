import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditActionBuilderLineComponent } from './edit-action-builder-line.component';

describe('EditActionBuilderLineComponent', () => {
  let component: EditActionBuilderLineComponent;
  let fixture: ComponentFixture<EditActionBuilderLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditActionBuilderLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditActionBuilderLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
