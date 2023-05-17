import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Allreport2Component } from './allreport2.component';

describe('Allreport2Component', () => {
  let component: Allreport2Component;
  let fixture: ComponentFixture<Allreport2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Allreport2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Allreport2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
