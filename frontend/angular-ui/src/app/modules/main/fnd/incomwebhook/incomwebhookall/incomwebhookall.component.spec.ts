import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomwebhookallComponent } from './incomwebhookall.component';

describe('IncomwebhookallComponent', () => {
  let component: IncomwebhookallComponent;
  let fixture: ComponentFixture<IncomwebhookallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomwebhookallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomwebhookallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
