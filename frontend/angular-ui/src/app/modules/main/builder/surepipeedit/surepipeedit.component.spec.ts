import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurepipeeditComponent } from './surepipeedit.component';

describe('SurepipeeditComponent', () => {
  let component: SurepipeeditComponent;
  let fixture: ComponentFixture<SurepipeeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurepipeeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurepipeeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
