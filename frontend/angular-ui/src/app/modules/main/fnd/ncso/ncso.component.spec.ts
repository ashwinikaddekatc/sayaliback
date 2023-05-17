import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcsoComponent } from './ncso.component';

describe('NcsoComponent', () => {
  let component: NcsoComponent;
  let fixture: ComponentFixture<NcsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NcsoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NcsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
