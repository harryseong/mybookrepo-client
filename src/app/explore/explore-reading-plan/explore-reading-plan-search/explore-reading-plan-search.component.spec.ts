import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExploreReadingPlanSearchComponent } from './explore-reading-plan-search.component';

describe('ExploreReadingPlanSearchComponent', () => {
  let component: ExploreReadingPlanSearchComponent;
  let fixture: ComponentFixture<ExploreReadingPlanSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreReadingPlanSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreReadingPlanSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
