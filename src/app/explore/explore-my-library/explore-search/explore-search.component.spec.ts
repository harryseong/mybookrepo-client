import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExploreSearchComponent } from './explore-search.component';

describe('ExploreSearchComponent', () => {
  let component: ExploreSearchComponent;
  let fixture: ComponentFixture<ExploreSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
