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
  payment = 0;
  salary = 1000000;
  discount = 0;
  vtua = 0;
  rate =0;
  perVtua = 0;
  income: 0;
/** rates params */
  private periodStep = 0;
  private amountStep = 0;

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

  public calculateAE(value){
    return (Math.pow(((value) +1),12) -1) * 100;

  }

  getBasicInfoSimulator() {
    this.simulatorService.getSimulatorParams().subscribe(response => {
      this.minLoan = response.minAmount;
      this.limitLoan = response.maxAmount;
      this.minTerm = response.minPeriods;
      this.maxTerm = response.maxPeriods;
      this.perLifeInsurance = response.perLifeInsurance;
      this.periodStep = response.periodStep;
      this.amountStep = response.amountStep;
      this.startRates();
    });
  }

  startRates() {
    this.simulatorService.getRates().subscribe(response => {
      this.rates = response;
      this.rate = 0.0139;/* this.rates[Math.round(this.actualMonths / 6) - 1][(this.actualLoan / 100000) - 1];*/
      this.maxLoan = this.simulatorService.maxLoanAmount(this.salary, this.discount, this.maxTerm,this.perLifeInsurance,this.rate);
      if(this.maxLoan > this.limitLoan){
        this.maxLoan = this.limitLoan;
      }
      this.actualLoan = this.simulatorService.roundTohundred(this.maxLoan * 0.75);
      this.updateSimulator();
    });
  }
/*
  get rate(){
    if( typeof(this.rates) === 'undefined' || this.rates === null ){
      return 0;
    }
    if(this.periodStep === 0 || this.amountStep === 0){
      return 0;
    }else{
      let y = parseInt( (this.actualLoan / this.amountStep)+'');
      let x = parseInt((this.actualMonths / this.periodStep)+'');
      if(y > 4){
        y = 4;
      }
      if(x > 5){
        x = 5;
      }
      return this.rates[x][y];
    }
  }
*/

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
    this.perVtua = this.calculateAE(this.simulatorService.getVTUA(this.actualMonths, this.actualLoan, this.payment)/100);
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
