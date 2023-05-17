import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugaddComponent } from './bugadd.component';

describe('BugaddComponent', () => {
  let component: BugaddComponent;
  let fixture: ComponentFixture<BugaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BugaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BugaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
