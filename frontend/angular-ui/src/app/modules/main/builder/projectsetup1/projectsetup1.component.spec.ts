import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Projectsetup1Component } from './projectsetup1.component';

describe('Projectsetup1Component', () => {
  let component: Projectsetup1Component;
  let fixture: ComponentFixture<Projectsetup1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Projectsetup1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Projectsetup1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
