import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lbrz-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css']
})
export class SimulatorComponent implements OnInit {

  actualLoan = 15000000;
  actualMonths = 72;
  isPaymentsOpen = false;

  constructor(private router:Router) { }

  ngOnInit() {
  }

  openPayments(){
    this.isPaymentsOpen = true;
  }

  closePayments(){
    this.isPaymentsOpen = false;
  }

  updateActualLoan(value){
    this.actualLoan= value;
  }

  updateActuaMonths(value){
    this.actualMonths= value;
  }

  onClick(){
    this.router.navigate(['/document-number']);
  }
}
