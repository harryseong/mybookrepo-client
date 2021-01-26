import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExploreProfileComponent } from './explore-profile.component';

describe('ExploreProfileComponent', () => {
  let component: ExploreProfileComponent;
  let fixture: ComponentFixture<ExploreProfileComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
