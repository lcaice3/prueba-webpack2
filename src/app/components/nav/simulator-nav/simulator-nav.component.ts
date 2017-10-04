import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lbrz-simulator-nav',
  templateUrl: './simulator-nav.component.html',
  styleUrls: ['./simulator-nav.component.css']
})
export class SimulatorNavComponent implements OnInit {

  date = new Date();
  
  constructor() { }

  ngOnInit() {
  }

}
