import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExploreReadingPlanTableComponent } from './explore-reading-plan-table.component';

describe('ExploreReadingPlanTableComponent', () => {
  let component: ExploreReadingPlanTableComponent;
  let fixture: ComponentFixture<ExploreReadingPlanTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreReadingPlanTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreReadingPlanTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
