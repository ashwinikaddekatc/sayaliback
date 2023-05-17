import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SFTPLocationComponent } from './sftp-location.component';

describe('SFTPLocationComponent', () => {
  let component: SFTPLocationComponent;
  let fixture: ComponentFixture<SFTPLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SFTPLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SFTPLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
