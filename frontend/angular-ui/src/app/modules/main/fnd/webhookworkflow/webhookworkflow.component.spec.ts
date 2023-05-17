import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebhookworkflowComponent } from './webhookworkflow.component';

describe('WebhookworkflowComponent', () => {
  let component: WebhookworkflowComponent;
  let fixture: ComponentFixture<WebhookworkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebhookworkflowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebhookworkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
