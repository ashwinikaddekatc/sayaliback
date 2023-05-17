import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dynamicform1Component } from './dynamicform1.component';

describe('Dynamicform1Component', () => {
  let component: Dynamicform1Component;
  let fixture: ComponentFixture<Dynamicform1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Dynamicform1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Dynamicform1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
