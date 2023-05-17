import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurefarmComponent } from './surefarm.component';

describe('SurefarmComponent', () => {
  let component: SurefarmComponent;
  let fixture: ComponentFixture<SurefarmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurefarmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurefarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
