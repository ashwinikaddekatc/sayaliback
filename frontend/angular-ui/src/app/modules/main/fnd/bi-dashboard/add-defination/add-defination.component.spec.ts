import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDefinationComponent } from './add-defination.component';

describe('AddDefinationComponent', () => {
  let component: AddDefinationComponent;
  let fixture: ComponentFixture<AddDefinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDefinationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDefinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
