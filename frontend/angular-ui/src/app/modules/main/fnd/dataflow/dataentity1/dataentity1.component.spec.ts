import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dataentity1Component } from './dataentity1.component';

describe('Dataentity1Component', () => {
  let component: Dataentity1Component;
  let fixture: ComponentFixture<Dataentity1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Dataentity1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Dataentity1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
