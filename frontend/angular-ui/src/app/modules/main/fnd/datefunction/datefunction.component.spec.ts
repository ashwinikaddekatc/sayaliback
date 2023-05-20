import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatefunctionComponent } from './datefunction.component';

describe('DatefunctionComponent', () => {
  let component: DatefunctionComponent;
  let fixture: ComponentFixture<DatefunctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatefunctionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatefunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
