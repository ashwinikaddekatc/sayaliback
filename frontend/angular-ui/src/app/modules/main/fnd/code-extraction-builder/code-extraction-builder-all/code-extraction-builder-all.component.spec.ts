import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeExtractionBuilderAllComponent } from './code-extraction-builder-all.component';

describe('CodeExtractionBuilderAllComponent', () => {
  let component: CodeExtractionBuilderAllComponent;
  let fixture: ComponentFixture<CodeExtractionBuilderAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeExtractionBuilderAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeExtractionBuilderAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
