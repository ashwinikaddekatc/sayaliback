import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SftpallComponent } from './sftpall.component';

describe('SftpallComponent', () => {
  let component: SftpallComponent;
  let fixture: ComponentFixture<SftpallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SftpallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SftpallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
