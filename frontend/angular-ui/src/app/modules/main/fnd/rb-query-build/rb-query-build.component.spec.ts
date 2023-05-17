import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RbQueryBuildComponent } from './rb-query-build.component';

describe('RbQueryBuildComponent', () => {
  let component: RbQueryBuildComponent;
  let fixture: ComponentFixture<RbQueryBuildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RbQueryBuildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RbQueryBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
