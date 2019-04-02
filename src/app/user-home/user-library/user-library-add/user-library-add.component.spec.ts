import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLibraryAddComponent } from './user-library-add.component';

describe('UserLibraryAddComponent', () => {
  let component: UserLibraryAddComponent;
  let fixture: ComponentFixture<UserLibraryAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLibraryAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLibraryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
