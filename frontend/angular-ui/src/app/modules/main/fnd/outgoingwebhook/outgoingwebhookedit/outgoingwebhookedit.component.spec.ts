import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutgoingwebhookeditComponent } from './outgoingwebhookedit.component';

describe('OutgoingwebhookeditComponent', () => {
  let component: OutgoingwebhookeditComponent;
  let fixture: ComponentFixture<OutgoingwebhookeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutgoingwebhookeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutgoingwebhookeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
