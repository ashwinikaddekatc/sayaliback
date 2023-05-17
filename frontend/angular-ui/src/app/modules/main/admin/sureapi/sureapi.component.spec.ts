import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SureapiComponent } from './sureapi.component';

describe('SureapiComponent', () => {
  let component: SureapiComponent;
  let fixture: ComponentFixture<SureapiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SureapiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SureapiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
