import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutgoingwebhookaddComponent } from './outgoingwebhookadd.component';

describe('OutgoingwebhookaddComponent', () => {
  let component: OutgoingwebhookaddComponent;
  let fixture: ComponentFixture<OutgoingwebhookaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutgoingwebhookaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutgoingwebhookaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
