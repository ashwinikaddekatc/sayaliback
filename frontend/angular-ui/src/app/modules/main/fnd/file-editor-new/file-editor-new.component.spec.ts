import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileEditorNewComponent } from './file-editor-new.component';

describe('FileEditorNewComponent', () => {
  let component: FileEditorNewComponent;
  let fixture: ComponentFixture<FileEditorNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileEditorNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileEditorNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
