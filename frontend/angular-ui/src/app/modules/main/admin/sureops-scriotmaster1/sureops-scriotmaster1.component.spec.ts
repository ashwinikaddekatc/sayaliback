import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SureopsScriotmaster1Component } from './sureops-scriotmaster1.component';

describe('SureopsScriotmaster1Component', () => {
  let component: SureopsScriotmaster1Component;
  let fixture: ComponentFixture<SureopsScriotmaster1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SureopsScriotmaster1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SureopsScriotmaster1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
