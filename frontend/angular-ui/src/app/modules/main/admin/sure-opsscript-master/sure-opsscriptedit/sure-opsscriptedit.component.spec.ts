import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SureOpsscripteditComponent } from './sure-opsscriptedit.component';

describe('SureOpsscripteditComponent', () => {
  let component: SureOpsscripteditComponent;
  let fixture: ComponentFixture<SureOpsscripteditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SureOpsscripteditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SureOpsscripteditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
