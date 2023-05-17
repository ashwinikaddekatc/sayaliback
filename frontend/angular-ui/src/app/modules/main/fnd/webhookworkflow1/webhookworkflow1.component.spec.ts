import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Webhookworkflow1Component } from './webhookworkflow1.component';

describe('Webhookworkflow1Component', () => {
  let component: Webhookworkflow1Component;
  let fixture: ComponentFixture<Webhookworkflow1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Webhookworkflow1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Webhookworkflow1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
