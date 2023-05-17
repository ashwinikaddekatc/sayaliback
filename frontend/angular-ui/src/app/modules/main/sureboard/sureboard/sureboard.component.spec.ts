import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SureboardComponent } from './sureboard.component';

describe('SureboardComponent', () => {
  let component: SureboardComponent;
  let fixture: ComponentFixture<SureboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SureboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SureboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
