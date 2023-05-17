import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddguestComponent } from './addguest.component';

describe('AddguestComponent', () => {
  let component: AddguestComponent;
  let fixture: ComponentFixture<AddguestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddguestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddguestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
