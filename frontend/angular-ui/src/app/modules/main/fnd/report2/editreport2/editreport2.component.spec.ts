import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Editreport2Component } from './editreport2.component';

describe('Editreport2Component', () => {
  let component: Editreport2Component;
  let fixture: ComponentFixture<Editreport2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Editreport2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Editreport2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
