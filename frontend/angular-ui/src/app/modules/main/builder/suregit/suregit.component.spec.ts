import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuregitComponent } from './suregit.component';

describe('SuregitComponent', () => {
  let component: SuregitComponent;
  let fixture: ComponentFixture<SuregitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuregitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuregitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
