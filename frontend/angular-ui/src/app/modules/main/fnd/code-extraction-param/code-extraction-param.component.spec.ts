import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeExtractionParamComponent } from './code-extraction-param.component';

describe('CodeExtractionParamComponent', () => {
  let component: CodeExtractionParamComponent;
  let fixture: ComponentFixture<CodeExtractionParamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeExtractionParamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeExtractionParamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
