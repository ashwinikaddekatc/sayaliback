import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuredocrComponent } from './suredocr.component';

describe('SuredocrComponent', () => {
  let component: SuredocrComponent;
  let fixture: ComponentFixture<SuredocrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuredocrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuredocrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
