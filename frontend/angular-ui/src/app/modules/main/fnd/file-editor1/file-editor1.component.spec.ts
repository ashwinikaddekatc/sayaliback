import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileEditor1Component } from './file-editor1.component';

describe('FileEditor1Component', () => {
  let component: FileEditor1Component;
  let fixture: ComponentFixture<FileEditor1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileEditor1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileEditor1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
