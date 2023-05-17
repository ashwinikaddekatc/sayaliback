import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GitfolderComponent } from './gitfolder.component';

describe('GitfolderComponent', () => {
  let component: GitfolderComponent;
  let fixture: ComponentFixture<GitfolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GitfolderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GitfolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
