import { TestBed, inject } from '@angular/core/testing';
import { CustomerService } from './customer.service';
import { BaseRequestOptions, Response, ResponseOptions, Http, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

describe('CustomerService', () => {

  let mockBackend: MockBackend;
  let service : CustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CustomerService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend: MockBackend, options: BaseRequestOptions) => new Http(backend, options),
          deps: [ MockBackend, BaseRequestOptions ]
        }
      ]
    });
  });

  beforeEach(inject([ MockBackend, Http, CustomerService ],
    (mb: MockBackend, http: Http, cs: CustomerService) => {
      mockBackend = mb;
      service = cs;
    }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return observable with hero array', (done) => {
    const id = '123123' 
    const expectedResult = {'isCustomer': true, 'isInBlacklist': false}
   
    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toEqual(RequestMethod.Get);
      connection.mockRespond(new Response(new ResponseOptions({
      body: expectedResult
      })))
    });
    service.userCRM(id).subscribe(result => {
      expect(result).toEqual(expectedResult);
      done();
    })
  })
});
