import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreReadingPlanTableComponent } from './explore-reading-plan-table.component';

describe('ExploreReadingPlanTableComponent', () => {
  let component: ExploreReadingPlanTableComponent;
  let fixture: ComponentFixture<ExploreReadingPlanTableComponent>;

  beforeEach(async(() => {
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
