import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gitfile1Component } from './gitfile1.component';

describe('Gitfile1Component', () => {
  let component: Gitfile1Component;
  let fixture: ComponentFixture<Gitfile1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Gitfile1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Gitfile1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
