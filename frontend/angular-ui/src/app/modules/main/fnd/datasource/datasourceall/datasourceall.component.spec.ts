import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasourceallComponent } from './datasourceall.component';

describe('DatasourceallComponent', () => {
  let component: DatasourceallComponent;
  let fixture: ComponentFixture<DatasourceallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatasourceallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasourceallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
