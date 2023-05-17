import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebhookallComponent } from './webhookall.component';

describe('WebhookallComponent', () => {
  let component: WebhookallComponent;
  let fixture: ComponentFixture<WebhookallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebhookallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebhookallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
