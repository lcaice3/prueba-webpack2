import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Http } from '@angular/http';

@Injectable()
export class CustomerService extends BaseService{

  constructor(private http: Http) {
    super();
  }

  public userCRM(cedula)
  {
    return this.http.get(`${this.baseUrl}/customer-exists/C/${cedula}`, { headers: this.headers })
    .map(
    response => response.json()
    ).catch(this.handleError);
  }

}
