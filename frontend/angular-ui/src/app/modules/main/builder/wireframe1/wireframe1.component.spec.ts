import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Wireframe1Component } from './wireframe1.component';

describe('Wireframe1Component', () => {
  let component: Wireframe1Component;
  let fixture: ComponentFixture<Wireframe1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Wireframe1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Wireframe1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
