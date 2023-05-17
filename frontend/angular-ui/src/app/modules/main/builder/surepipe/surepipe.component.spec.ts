import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurepipeComponent } from './surepipe.component';

describe('SurepipeComponent', () => {
  let component: SurepipeComponent;
  let fixture: ComponentFixture<SurepipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurepipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurepipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
