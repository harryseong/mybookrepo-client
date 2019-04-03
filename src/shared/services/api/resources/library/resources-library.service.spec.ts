import { TestBed } from '@angular/core/testing';

import { ResourcesLibraryService } from './resources-library.service';

describe('ResourcesLibraryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResourcesLibraryService = TestBed.get(ResourcesLibraryService);
    expect(service).toBeTruthy();
  });
});
