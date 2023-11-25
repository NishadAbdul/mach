import { TestBed } from '@angular/core/testing';

import { AdditionalDetailsService } from './additional-details.service';

describe('AdditionalDetailsService', () => {
  let service: AdditionalDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdditionalDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
