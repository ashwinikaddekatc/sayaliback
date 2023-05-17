import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurebuilderComponent } from './surebuilder.component';

describe('SurebuilderComponent', () => {
  let component: SurebuilderComponent;
  let fixture: ComponentFixture<SurebuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurebuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurebuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
