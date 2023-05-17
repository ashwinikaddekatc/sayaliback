import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtemplateComponent } from './ctemplate.component';

describe('CtemplateComponent', () => {
  let component: CtemplateComponent;
  let fixture: ComponentFixture<CtemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CtemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
