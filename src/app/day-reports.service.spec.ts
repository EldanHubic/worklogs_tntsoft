import { TestBed } from '@angular/core/testing';

import { DayReportsService } from './day-reports.service';

describe('DayReportsService', () => {
  let service: DayReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DayReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
