import {BaseService} from './base.service';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {createTextSpanFromBounds} from 'typescript';
import {Finance} from 'financejs';
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
      return this.http.get(this.ratesURL, {headers: this.headers})
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
    return this.http.get(this.paramsURL, {headers: this.headers})
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

  public maxLoanAmount(salary: number, discount: number, term: number, perLifeInsurance: number) {
    let maxLoan = term * ((salary / 2) - discount);
    let lifeInsurance = (maxLoan * perLifeInsurance) * term;
    maxLoan = maxLoan - lifeInsurance; 
    return maxLoan - (maxLoan%100000);
  }

  public roundTohundred(value: number){
    return value - (value%100000);
  }

  public calculatePayments(amount: number,term:number, lifeInsurance: number, firstPayment: number, rate: number ){
    let payments: Array<Payment> = new Array();
    console.log('entro');
    for(let i = 1;i <= term; i++){
      let payment = new Payment();
      payment.interest = amount * rate;
      payment.amortization = firstPayment - payment.interest - lifeInsurance;
      payment.balance = amount- payment.amortization;
      amount = payment.balance;
      payment.totalPayment = firstPayment;
      payment.lifeInsurance = lifeInsurance;
      payments.push(payment);
    }
    console.log('termino de calcular',payments);
    return payments;
  }
}
