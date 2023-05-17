import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomwebhookeditComponent } from './incomwebhookedit.component';

describe('IncomwebhookeditComponent', () => {
  let component: IncomwebhookeditComponent;
  let fixture: ComponentFixture<IncomwebhookeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomwebhookeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomwebhookeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
