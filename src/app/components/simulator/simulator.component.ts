import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SimulatorNavComponent } from '../nav/simulator-nav/simulator-nav.component';
import { SimulatorService } from '../../services/simulator.service';
import { SimulatorParams } from '../../models/simulatorParam';
import { Control } from '../field-form/control';
import { Payment } from '../../models/payment';

@Component({
  selector: 'lbrz-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css']
})
export class SimulatorComponent implements OnInit {

  actualLoan = 0;
  actualMonths = 72;
  isPaymentsOpen = false;
  minLoan = 500000;
  maxLoan = 0; 
  limitLoan = 0; 
  minTerm = 0;
  maxTerm = 0;
  perLifeInsurance = 0;
  rates: any;
  rate = 0;
  payment = 0;
  salary = 1000000;
  discount = 0;
  vtua = 0;
  income: 0;
  payments: Array<Payment> = [];
  constructor(private router: Router, private simulatorService: SimulatorService) { }

  ngOnInit() {
    this.salary = JSON.parse(localStorage.getItem('salary'));
    this.discount = JSON.parse(localStorage.getItem('discount'));
    if(this.salary === null || this.salary === 0){
      this.router.navigate(['/welcome']);
    }
    this.getBasicInfoSimulator();
  }

  get lifeInsurance() {
    return this.actualLoan * this.perLifeInsurance;
  }

  public calculateAE(){
    return (Math.pow(((this.rate) +1),12) -1) * 100;

  }

  getBasicInfoSimulator() {
    this.simulatorService.getSimulatorParams().subscribe(response => {
      this.minLoan = response.minAmount;
      this.limitLoan = response.maxAmount;
      this.minTerm = response.minPeriods;
      this.maxTerm = response.maxPeriods;
      this.perLifeInsurance = response.perLifeInsurance;
      this.startRates();
    });
  }

  startRates() {
    this.simulatorService.getRates().subscribe(response => {
      this.rates = response;
      this.rate = 0.0125;/* this.rates[Math.round(this.actualMonths / 6) - 1][(this.actualLoan / 100000) - 1];*/
      this.maxLoan = this.simulatorService.maxLoanAmount(this.salary, this.discount, this.maxTerm,this.perLifeInsurance,this.rate);
      if(this.maxLoan > this.limitLoan){
        this.maxLoan = this.limitLoan;
      }
      this.actualLoan = this.simulatorService.roundTohundred(this.maxLoan * 0.75);
      this.updateSimulator();
    });
  }

  private updateSimulator(){
    this.payment = this.simulatorService.getPayment(this.rate, this.actualMonths, this.actualLoan) + this.lifeInsurance;
    if(this.actualLoan > 90000000){
      console.log(this.rate,this.payment);
    }
  }

  openPayments() {
    let response = this.simulatorService.calculatePayments(this.actualLoan,this.actualMonths, this.lifeInsurance, this.payment, this.rate);
    this.payments = response.payments;
    this.vtua = response.vtua;
    this.isPaymentsOpen = true;
  }

  closePayments() {
    this.isPaymentsOpen = false;
  }

  updateActualLoan(value) {
    this.actualLoan = value;
    this.updateSimulator();
  }

  updateActuaMonths(value) {
    this.actualMonths = value;
    this.maxLoan = this.simulatorService.maxLoanAmount(this.salary, this.discount, this.actualMonths,this.perLifeInsurance,this.rate);
    if(this.actualLoan > this.maxLoan){
      this.actualLoan = this.maxLoan;
    }
    this.updateSimulator();
  }

  onClick() {
    this.router.navigate(['/document-number']);
  }
}
