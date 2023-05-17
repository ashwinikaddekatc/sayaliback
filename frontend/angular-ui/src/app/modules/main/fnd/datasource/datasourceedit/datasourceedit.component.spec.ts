import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasourceeditComponent } from './datasourceedit.component';

describe('DatasourceeditComponent', () => {
  let component: DatasourceeditComponent;
  let fixture: ComponentFixture<DatasourceeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatasourceeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasourceeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
