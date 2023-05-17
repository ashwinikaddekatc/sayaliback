import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Adddynamicform1Component } from './adddynamicform1.component';

describe('Adddynamicform1Component', () => {
  let component: Adddynamicform1Component;
  let fixture: ComponentFixture<Adddynamicform1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Adddynamicform1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Adddynamicform1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
