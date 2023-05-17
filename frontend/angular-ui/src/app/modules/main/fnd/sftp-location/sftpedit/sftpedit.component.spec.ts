import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SftpeditComponent } from './sftpedit.component';

describe('SftpeditComponent', () => {
  let component: SftpeditComponent;
  let fixture: ComponentFixture<SftpeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SftpeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SftpeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
