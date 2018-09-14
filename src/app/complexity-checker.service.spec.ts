import { TestBed } from '@angular/core/testing';

import { ComplexityCheckerService } from './complexity-checker.service';

describe('ComplexityCheckerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComplexityCheckerService = TestBed.get(ComplexityCheckerService);
    expect(service).toBeTruthy();
  });
});
