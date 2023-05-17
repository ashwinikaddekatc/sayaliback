import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeExtractionBuilderComponent } from './code-extraction-builder.component';

describe('CodeExtractionBuilderComponent', () => {
  let component: CodeExtractionBuilderComponent;
  let fixture: ComponentFixture<CodeExtractionBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeExtractionBuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeExtractionBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
