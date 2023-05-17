import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SureopsScriotmaster1addComponent } from './sureops-scriotmaster1add.component';

describe('SureopsScriotmaster1addComponent', () => {
  let component: SureopsScriotmaster1addComponent;
  let fixture: ComponentFixture<SureopsScriotmaster1addComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SureopsScriotmaster1addComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SureopsScriotmaster1addComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
