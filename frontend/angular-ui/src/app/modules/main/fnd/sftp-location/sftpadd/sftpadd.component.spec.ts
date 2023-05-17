import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SftpaddComponent } from './sftpadd.component';

describe('SftpaddComponent', () => {
  let component: SftpaddComponent;
  let fixture: ComponentFixture<SftpaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SftpaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SftpaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
