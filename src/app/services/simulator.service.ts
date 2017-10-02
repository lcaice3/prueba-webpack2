import {BaseService} from './base.service';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {createTextSpanFromBounds} from 'typescript';
import {Finance} from 'financejs';

@Injectable()
export class SimulatorService extends BaseService {
  ratesUrl = '${this.baseUrl}/simulator/rates-table';
  rates: number[][];
  finance: Finance;

  constructor(private http: Http) {
    super();
    this.finance = new Finance();
  }

  public getRates(): Observable<number[][]> {
    if (this.rates == null) {
      return this.http.get(this.ratesUrl, {headers: this.headers})
        .map(response => {
          this.rates = response.json();
          return this.rates;
        })
        .catch(this.handleError);

    } else {
      return Observable.of(this.rates);
    }
  }

  public getSimulatorParams(): Observable<any> {
    return this.http.get(this.ratesUrl, {headers: this.headers})
      .map(response => response.json())
      .catch(this.handleError);
  }

  public getPayment(rate: number, term: number, amount: number): number {
    const ratePer = rate * 100;
    return this.finance.AM(amount, rate, term, 1, false);
  }

  public getVTUA(term: number, amount: number, payment: number) {

    const payments = Array.apply(null, new Array(term)).map(() => payment);

    return this.finance.IRR(-amount, payments);
  }

  public maxLoanAmount(salary: number, discount: number, term: number) {
    return term * ((salary / 2) - discount);
  }
}
