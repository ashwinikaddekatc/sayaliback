import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeworkflowComponent } from './codeworkflow.component';

describe('CodeworkflowComponent', () => {
  let component: CodeworkflowComponent;
  let fixture: ComponentFixture<CodeworkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeworkflowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeworkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
