import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryRunner1Component } from './query-runner1.component';

describe('QueryRunner1Component', () => {
  let component: QueryRunner1Component;
  let fixture: ComponentFixture<QueryRunner1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueryRunner1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryRunner1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
