import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetwebhookComponent } from './getwebhook.component';

describe('GetwebhookComponent', () => {
  let component: GetwebhookComponent;
  let fixture: ComponentFixture<GetwebhookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetwebhookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetwebhookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
