import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddruleSureboardComponent } from './addrule-sureboard.component';

describe('AddruleSureboardComponent', () => {
  let component: AddruleSureboardComponent;
  let fixture: ComponentFixture<AddruleSureboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddruleSureboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddruleSureboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
