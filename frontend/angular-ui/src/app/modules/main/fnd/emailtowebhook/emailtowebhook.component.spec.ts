import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailtowebhookComponent } from './emailtowebhook.component';

describe('EmailtowebhookComponent', () => {
  let component: EmailtowebhookComponent;
  let fixture: ComponentFixture<EmailtowebhookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailtowebhookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailtowebhookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
