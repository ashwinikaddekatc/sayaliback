import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeExtractionParameditComponent } from './code-extraction-paramedit.component';

describe('CodeExtractionParameditComponent', () => {
  let component: CodeExtractionParameditComponent;
  let fixture: ComponentFixture<CodeExtractionParameditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeExtractionParameditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeExtractionParameditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
