import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CjobqueueComponent } from './cjobqueue.component';

describe('CjobqueueComponent', () => {
  let component: CjobqueueComponent;
  let fixture: ComponentFixture<CjobqueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CjobqueueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CjobqueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
