import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExploreReadingPlanComponent } from './explore-reading-plan.component';

describe('ExploreReadingPlanComponent', () => {
  let component: ExploreReadingPlanComponent;
  let fixture: ComponentFixture<ExploreReadingPlanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreReadingPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreReadingPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
