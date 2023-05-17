import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeExtractionallComponent } from './code-extractionall.component';

describe('CodeExtractionallComponent', () => {
  let component: CodeExtractionallComponent;
  let fixture: ComponentFixture<CodeExtractionallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeExtractionallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeExtractionallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
