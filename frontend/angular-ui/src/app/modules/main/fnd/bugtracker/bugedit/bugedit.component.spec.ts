import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugeditComponent } from './bugedit.component';

describe('BugeditComponent', () => {
  let component: BugeditComponent;
  let fixture: ComponentFixture<BugeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BugeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BugeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
