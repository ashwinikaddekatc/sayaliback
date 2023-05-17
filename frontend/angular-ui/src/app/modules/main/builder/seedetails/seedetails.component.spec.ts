import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeedetailsComponent } from './seedetails.component';

describe('SeedetailsComponent', () => {
  let component: SeedetailsComponent;
  let fixture: ComponentFixture<SeedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeedetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
