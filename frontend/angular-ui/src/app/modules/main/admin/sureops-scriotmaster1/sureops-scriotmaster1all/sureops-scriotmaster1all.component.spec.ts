import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SureopsScriotmaster1allComponent } from './sureops-scriotmaster1all.component';

describe('SureopsScriotmaster1allComponent', () => {
  let component: SureopsScriotmaster1allComponent;
  let fixture: ComponentFixture<SureopsScriotmaster1allComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SureopsScriotmaster1allComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SureopsScriotmaster1allComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
