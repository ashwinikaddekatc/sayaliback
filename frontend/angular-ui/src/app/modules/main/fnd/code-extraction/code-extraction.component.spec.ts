import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeExtractionComponent } from './code-extraction.component';

describe('CodeExtractionComponent', () => {
  let component: CodeExtractionComponent;
  let fixture: ComponentFixture<CodeExtractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeExtractionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeExtractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
