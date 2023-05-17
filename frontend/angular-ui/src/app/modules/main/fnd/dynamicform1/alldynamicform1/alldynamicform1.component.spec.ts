import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Alldynamicform1Component } from './alldynamicform1.component';

describe('Alldynamicform1Component', () => {
  let component: Alldynamicform1Component;
  let fixture: ComponentFixture<Alldynamicform1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Alldynamicform1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Alldynamicform1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
