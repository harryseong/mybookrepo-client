import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreViewByYearsComponent } from './explore-view-by-years.component';

describe('ExploreViewByYearsComponent', () => {
  let component: ExploreViewByYearsComponent;
  let fixture: ComponentFixture<ExploreViewByYearsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreViewByYearsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreViewByYearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
