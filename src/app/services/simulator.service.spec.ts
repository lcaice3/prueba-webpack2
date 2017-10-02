import {TestBed, inject} from '@angular/core/testing';

import { BaseRequestOptions, Response, ResponseOptions, Http, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import {SimulatorService} from './simulator.service';

describe('SimulatorService', () => {
  
  let mockBackend: mockBackend;
  let service : SimulatorService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SimulatorService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend: MockBackend, options: BaseRequestOptions) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }]
    });
  });
  
  beforeEach(inject([MockBackend, Http, SimulatorService ],
    (mb: MockBackend, http: Http, cs: SimulatorService) => {
      mockBackend = mb;
      service = cs;
    }));

  it('should be created') => {
    expect(service).toBeTruthy();
  }));

  fit('should return payment') => {
    expect(service.getPayment(3, 12, 5000)).toBeCloseTo(1567.27, 2);
  }));
});
