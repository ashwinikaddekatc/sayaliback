import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RbStdParamComponent } from './rb-std-param.component';

describe('RbStdParamComponent', () => {
  let component: RbStdParamComponent;
  let fixture: ComponentFixture<RbStdParamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RbStdParamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RbStdParamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
