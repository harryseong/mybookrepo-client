import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserLibraryComponent } from './user-library.component';

describe('UserLibraryComponent', () => {
  let component: UserLibraryComponent;
  let fixture: ComponentFixture<UserLibraryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
