import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeExtractionaddComponent } from './code-extractionadd.component';

describe('CodeExtractionaddComponent', () => {
  let component: CodeExtractionaddComponent;
  let fixture: ComponentFixture<CodeExtractionaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeExtractionaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeExtractionaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
