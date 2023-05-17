import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostwebhookComponent } from './postwebhook.component';

describe('PostwebhookComponent', () => {
  let component: PostwebhookComponent;
  let fixture: ComponentFixture<PostwebhookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostwebhookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostwebhookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
