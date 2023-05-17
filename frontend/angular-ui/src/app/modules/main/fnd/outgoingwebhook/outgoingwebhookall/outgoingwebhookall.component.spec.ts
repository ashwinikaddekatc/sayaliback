import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutgoingwebhookallComponent } from './outgoingwebhookall.component';

describe('OutgoingwebhookallComponent', () => {
  let component: OutgoingwebhookallComponent;
  let fixture: ComponentFixture<OutgoingwebhookallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutgoingwebhookallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutgoingwebhookallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
