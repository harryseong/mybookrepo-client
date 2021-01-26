import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExploreMyLibraryComponent } from './explore-my-library.component';

describe('ExploreMyLibraryComponent', () => {
  let component: ExploreMyLibraryComponent;
  let fixture: ComponentFixture<ExploreMyLibraryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreMyLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreMyLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
