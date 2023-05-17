import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlltypeComponent } from './alltype.component';

describe('AlltypeComponent', () => {
  let component: AlltypeComponent;
  let fixture: ComponentFixture<AlltypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlltypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlltypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
