import { TestBed, inject } from '@angular/core/testing';

import { DuccService } from './ducc.service';

describe('DuccService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DuccService]
    });
  });

  it('should be created', inject([DuccService], (service: DuccService) => {
    expect(service).toBeTruthy();
  }));
});
