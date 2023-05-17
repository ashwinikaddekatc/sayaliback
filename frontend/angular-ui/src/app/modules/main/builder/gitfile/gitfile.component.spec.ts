import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GitfileComponent } from './gitfile.component';

describe('GitfileComponent', () => {
  let component: GitfileComponent;
  let fixture: ComponentFixture<GitfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GitfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GitfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
