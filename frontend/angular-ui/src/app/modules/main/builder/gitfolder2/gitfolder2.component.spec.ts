import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gitfolder2Component } from './gitfolder2.component';

describe('Gitfolder2Component', () => {
  let component: Gitfolder2Component;
  let fixture: ComponentFixture<Gitfolder2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Gitfolder2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Gitfolder2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
