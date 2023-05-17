import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Editdynamicform1Component } from './editdynamicform1.component';

describe('Editdynamicform1Component', () => {
  let component: Editdynamicform1Component;
  let fixture: ComponentFixture<Editdynamicform1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Editdynamicform1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Editdynamicform1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
