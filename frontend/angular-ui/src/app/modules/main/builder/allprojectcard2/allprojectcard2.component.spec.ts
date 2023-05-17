import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Allprojectcard2Component } from './allprojectcard2.component';

describe('Allprojectcard2Component', () => {
  let component: Allprojectcard2Component;
  let fixture: ComponentFixture<Allprojectcard2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Allprojectcard2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Allprojectcard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
