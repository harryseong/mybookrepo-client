import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GravatarDialogComponent } from './gravatar-dialog.component';

describe('GravatarDialogComponent', () => {
  let component: GravatarDialogComponent;
  let fixture: ComponentFixture<GravatarDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GravatarDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GravatarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
