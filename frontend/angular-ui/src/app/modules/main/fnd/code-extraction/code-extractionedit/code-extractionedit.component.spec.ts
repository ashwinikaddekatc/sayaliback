import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeExtractioneditComponent } from './code-extractionedit.component';

describe('CodeExtractioneditComponent', () => {
  let component: CodeExtractioneditComponent;
  let fixture: ComponentFixture<CodeExtractioneditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeExtractioneditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeExtractioneditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
