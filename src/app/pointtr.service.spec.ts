import { TestBed } from '@angular/core/testing';

import { PointtrService } from './pointtr.service';

describe('PointtrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PointtrService = TestBed.get(PointtrService);
    expect(service).toBeTruthy();
  });
});
