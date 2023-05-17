import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Test19Component } from './test19.component';

describe('Test19Component', () => {
  let component: Test19Component;
  let fixture: ComponentFixture<Test19Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Test19Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Test19Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
