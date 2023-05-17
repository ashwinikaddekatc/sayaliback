import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatastoreeditComponent } from './datastoreedit.component';

describe('DatastoreeditComponent', () => {
  let component: DatastoreeditComponent;
  let fixture: ComponentFixture<DatastoreeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatastoreeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatastoreeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
