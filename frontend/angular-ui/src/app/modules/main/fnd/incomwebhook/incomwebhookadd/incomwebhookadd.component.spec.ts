import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomwebhookaddComponent } from './incomwebhookadd.component';

describe('IncomwebhookaddComponent', () => {
  let component: IncomwebhookaddComponent;
  let fixture: ComponentFixture<IncomwebhookaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomwebhookaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomwebhookaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
