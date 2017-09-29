import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lbrz-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css']
})
export class SimulatorComponent implements OnInit {

  actualLoan = 15000000;
  actualMonths = 72;

  constructor() { }

  ngOnInit() {
  }

  updateActualLoan(value){
    this.actualLoan= value;
  }

  updateActuaMonths(value){
    this.actualMonths= value;
  }

}
