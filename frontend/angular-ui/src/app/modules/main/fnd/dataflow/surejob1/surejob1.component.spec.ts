import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Surejob1Component } from './surejob1.component';

describe('Surejob1Component', () => {
  let component: Surejob1Component;
  let fixture: ComponentFixture<Surejob1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Surejob1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Surejob1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
