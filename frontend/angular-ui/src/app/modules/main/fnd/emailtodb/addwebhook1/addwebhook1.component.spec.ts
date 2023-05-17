import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addwebhook1Component } from './addwebhook1.component';

describe('Addwebhook1Component', () => {
  let component: Addwebhook1Component;
  let fixture: ComponentFixture<Addwebhook1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Addwebhook1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Addwebhook1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
