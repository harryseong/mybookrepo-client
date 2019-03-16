import { TestBed } from '@angular/core/testing';

import { ResourcesApiService } from './resources-api.service';

describe('ResourcesApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResourcesApiService = TestBed.get(ResourcesApiService);
    expect(service).toBeTruthy();
  });
});
