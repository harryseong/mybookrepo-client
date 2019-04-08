import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GravatarDialogComponent } from './gravatar-dialog.component';

describe('GravatarDialogComponent', () => {
  let component: GravatarDialogComponent;
  let fixture: ComponentFixture<GravatarDialogComponent>;

  beforeEach(async(() => {
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
