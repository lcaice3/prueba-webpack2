import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bdb-range-bar',
  templateUrl: './range-bar.component.html',
  styleUrls: ['./range-bar.component.css']
})
export class RangeBarComponent implements OnInit {

  max = 10000000;
  actualValue;
  range; 

  constructor() { }

  ngOnInit() {
  }

  getRangeValue(){
    this.range = (this.actualValue*100/this.max)+'%';
    return this.range;
  }
}
