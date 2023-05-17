import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasourceaddComponent } from './datasourceadd.component';

describe('DatasourceaddComponent', () => {
  let component: DatasourceaddComponent;
  let fixture: ComponentFixture<DatasourceaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatasourceaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasourceaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
