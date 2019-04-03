import { TestBed } from '@angular/core/testing';

import { ResourcesPlanService } from './resources-plan.service';

describe('ResourcesPlanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResourcesPlanService = TestBed.get(ResourcesPlanService);
    expect(service).toBeTruthy();
  });
});
