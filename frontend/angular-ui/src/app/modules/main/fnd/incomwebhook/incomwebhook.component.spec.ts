import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomwebhookComponent } from './incomwebhook.component';

describe('IncomwebhookComponent', () => {
  let component: IncomwebhookComponent;
  let fixture: ComponentFixture<IncomwebhookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomwebhookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomwebhookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
