import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreMyLibraryComponent } from './explore-my-library.component';

describe('ExploreMyLibraryComponent', () => {
  let component: ExploreMyLibraryComponent;
  let fixture: ComponentFixture<ExploreMyLibraryComponent>;

  beforeEach(async(() => {
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
