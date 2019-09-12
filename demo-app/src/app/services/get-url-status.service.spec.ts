import { TestBed } from '@angular/core/testing';

import { GetUrlStatusService } from './get-url-status.service';

describe('GetUrlStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetUrlStatusService = TestBed.get(GetUrlStatusService);
    expect(service).toBeTruthy();
  });
});
