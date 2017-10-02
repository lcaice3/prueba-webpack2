import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SimulatorNavComponent } from '../nav/simulator-nav/simulator-nav.component';
import { SimulatorService } from '../../services/simulator.service';
import { SimulatorParams } from '../../models/simulatorParam';

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
  minTerm = 0;
  maxTerm = 0;
  perLifeInsurance = 0;
  rates: any;
  rate = 0;
  payment = 0;
  salary = 1000000;
  discount = 0;

  constructor(private router: Router, private simulatorService: SimulatorService) { }

  ngOnInit() {
    this.getBasicInfoSimulator();
  }

  get lifeInsurance() {
    return this.actualLoan * this.perLifeInsurance;
  }

  getBasicInfoSimulator() {
    this.simulatorService.getSimulatorParams().subscribe(response => {
      this.minLoan = response.minAmount;
      this.minTerm = response.minPeriods;
      this.maxTerm = response.maxPeriods;
      this.maxLoan = this.simulatorService.maxLoanAmount(this.salary, this.discount, this.maxTerm);
      this.actualLoan = this.maxLoan * 0.75;
      this.perLifeInsurance = response.perLifeInsurance;
      this.startRates();
    });
  }

  startRates() {
    this.simulatorService.getRates().subscribe(response => {
      this.rates = response;
      this.updateSimulator();
    });
  }

  private updateSimulator(){
    this.rate = this.rates[(this.actualMonths / 6) - 1][(this.actualLoan / 100000) - 1];
    this.payment = this.simulatorService.getPayment(this.rate, this.actualMonths, this.actualLoan) + this.lifeInsurance;
  }

  openPayments() {
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
    this.maxLoan = this.simulatorService.maxLoanAmount(this.salary, this.discount, this.actualMonths);
    if(this.actualLoan > this.maxLoan){
      this.actualLoan = this.maxLoan;
    }
    this.updateSimulator();
  }

  onClick() {
    this.router.navigate(['/document-number']);
  }
}
