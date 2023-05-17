import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionBuilderLineComponent } from './action-builder-line.component';

describe('ActionBuilderLineComponent', () => {
  let component: ActionBuilderLineComponent;
  let fixture: ComponentFixture<ActionBuilderLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionBuilderLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionBuilderLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
