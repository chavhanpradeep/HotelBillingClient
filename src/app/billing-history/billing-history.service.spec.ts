import { TestBed } from '@angular/core/testing';

import { BillingHistoryService } from './billing-history.service';

describe('BillingHistoryService', () => {
  let service: BillingHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillingHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
