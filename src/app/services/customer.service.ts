import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Http,RequestOptions } from '@angular/http';

@Injectable()
export class CustomerService extends BaseService {

  constructor(private http: Http) {
    super();
  }

  public userCRM(cedula) {
    const options = new RequestOptions({ headers: this.headers });
    return this.http.get(`${this.baseUrl}/customer-exists?documentType=C&documentNumber=${cedula}`, options)
    .map(
    response => response.json()
    ).catch(this.handleError);
  }

}
