import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilddetailsComponent } from './builddetails.component';

describe('BuilddetailsComponent', () => {
  let component: BuilddetailsComponent;
  let fixture: ComponentFixture<BuilddetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuilddetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuilddetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
