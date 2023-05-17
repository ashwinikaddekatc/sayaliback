import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SureopsScriotmaster1editComponent } from './sureops-scriotmaster1edit.component';

describe('SureopsScriotmaster1editComponent', () => {
  let component: SureopsScriotmaster1editComponent;
  let fixture: ComponentFixture<SureopsScriotmaster1editComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SureopsScriotmaster1editComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SureopsScriotmaster1editComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
