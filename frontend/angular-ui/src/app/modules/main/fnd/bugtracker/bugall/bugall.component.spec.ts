import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugallComponent } from './bugall.component';

describe('BugallComponent', () => {
  let component: BugallComponent;
  let fixture: ComponentFixture<BugallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BugallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BugallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
