import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatafloweditComponent } from './dataflowedit.component';

describe('DatafloweditComponent', () => {
  let component: DatafloweditComponent;
  let fixture: ComponentFixture<DatafloweditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatafloweditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatafloweditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
