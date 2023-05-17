import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleSetup1Component } from './module-setup1.component';

describe('ModuleSetup1Component', () => {
  let component: ModuleSetup1Component;
  let fixture: ComponentFixture<ModuleSetup1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleSetup1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleSetup1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
