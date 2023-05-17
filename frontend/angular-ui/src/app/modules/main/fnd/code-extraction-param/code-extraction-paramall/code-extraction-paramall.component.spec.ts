import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeExtractionParamallComponent } from './code-extraction-paramall.component';

describe('CodeExtractionParamallComponent', () => {
  let component: CodeExtractionParamallComponent;
  let fixture: ComponentFixture<CodeExtractionParamallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeExtractionParamallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeExtractionParamallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
