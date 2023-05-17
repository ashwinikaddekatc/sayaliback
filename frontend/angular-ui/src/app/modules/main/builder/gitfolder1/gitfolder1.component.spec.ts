import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gitfolder1Component } from './gitfolder1.component';

describe('Gitfolder1Component', () => {
  let component: Gitfolder1Component;
  let fixture: ComponentFixture<Gitfolder1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Gitfolder1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Gitfolder1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
