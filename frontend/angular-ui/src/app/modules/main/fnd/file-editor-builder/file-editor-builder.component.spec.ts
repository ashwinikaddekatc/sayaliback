import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileEditorBuilderComponent } from './file-editor-builder.component';

describe('FileEditorBuilderComponent', () => {
  let component: FileEditorBuilderComponent;
  let fixture: ComponentFixture<FileEditorBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileEditorBuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileEditorBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
