import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailtodbComponent } from './emailtodb.component';

describe('EmailtodbComponent', () => {
  let component: EmailtodbComponent;
  let fixture: ComponentFixture<EmailtodbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailtodbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailtodbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
