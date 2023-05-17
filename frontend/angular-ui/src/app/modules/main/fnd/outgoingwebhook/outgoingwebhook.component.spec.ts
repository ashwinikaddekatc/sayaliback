import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutgoingwebhookComponent } from './outgoingwebhook.component';

describe('OutgoingwebhookComponent', () => {
  let component: OutgoingwebhookComponent;
  let fixture: ComponentFixture<OutgoingwebhookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutgoingwebhookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutgoingwebhookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
