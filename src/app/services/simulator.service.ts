import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { createTextSpanFromBounds } from 'typescript';
import { Finance } from 'financejs';
import { Payment } from '../models/payment';

@Injectable()
export class SimulatorService extends BaseService {
  ratesURL = `${this.baseUrl}/simulator/rates-table`;
  paramsURL = `${this.baseUrl}/simulator/simulation-params`;
  rates: number[][];
  finance: Finance;

  constructor(private http: Http) {
    super();
    this.finance = new Finance();
  }

  public getRates() {
    if (this.rates == null) {
      const options = new RequestOptions({ headers: this.headers });
      return this.http.get(this.ratesURL, options )
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
    const options = new RequestOptions({ headers: this.headers });
    return this.http.get(this.paramsURL, options)
    .map(
    response => response.json()
    ).catch(this.handleError);
  }

  public getPayment(rate: number, term: number, amount: number): number {
    const ratePer = (rate * 1200);
    return this.finance.AM(amount, ratePer, term, 1, false);
  }

  public getVTUA(term: number, amount: number, payment: number) {
    const payments = [-amount].concat(Array.apply(null, new Array(term)).map(() => payment));
    return this.finance.IRR.apply(this, payments);
  }

  public maxLoanAmount(salary: number, discount: number, term: number, perLifeInsurance: number, rate: number) {
    let maxPayment = (salary / 2) - discount;
    let maxLoan = (maxPayment * (Math.pow((1 + rate), term) - 1)) / (Math.pow((1 + rate), term) * rate);
    let lifeInsurance = (maxLoan * perLifeInsurance) * term;
    maxLoan = maxLoan - lifeInsurance;
    return maxLoan - (maxLoan % 100000);
  }

  public roundTohundred(value: number) {
    return value - (value % 100000);
  }

  public calculatePayments(amount: number, term: number, lifeInsurance: number, firstPayment: number, rate: number): { payments: Array<Payment>, vtua: number } {
    let vtua = 0;
    let payments: Array<Payment> = new Array();
    for (let i = 1; i <= term; i++) {
      let payment = new Payment();
      payment.interest = amount * rate;
      payment.amortization = firstPayment - payment.interest - lifeInsurance;
      if (i === term) {
        payment.balance = 0;
      } else {
        payment.balance = amount - payment.amortization;
      }
      amount = payment.balance;
      payment.totalPayment = firstPayment;
      payment.lifeInsurance = lifeInsurance;
      vtua += payment.totalPayment;
      payments.push(payment);
    }

    return { payments: payments, vtua: vtua };
  }
}
