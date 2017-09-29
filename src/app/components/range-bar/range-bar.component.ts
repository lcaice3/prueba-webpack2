import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { async } from '@angular/core/testing';

@Component({
  selector: 'bdb-range-bar',
  templateUrl: './range-bar.component.html',
  styleUrls: ['./range-bar.component.css']
})
export class RangeBarComponent implements OnInit {

  @Input('max') max = 10000000;
  @Input('min') min = 500000;
  @Input('step') step = 100000;
  @Output('valueChange') valueChange = new EventEmitter();
  @Input('actualValue') actualValue = 0;
  @Input('startValue') startValue = 5000000;
  range;
  firstTime = false;

  constructor() { }

  ngOnInit() {
    this.isFisrtTime();
    this.setFirstTime();
  }

  notifyChange(event) {
    this.valueChange.emit(event);
  }

  getRangeValue() {


    let porciones = (this.max / this.step) - 1;
    let porcionActual = (this.actualValue / this.step) - 1;

    this.range = (porcionActual * (100) / porciones) + '%';
    return this.range;
  }

  setFirstTime() {
    setTimeout(() => {
      this.firstTime = false;
    }, 1000);
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  isFisrtTime() {
    setTimeout(async () => {
      this.firstTime = true;
      for (let i = 0; i <= this.startValue; i += this.step) {
        if (this.max < 1000) {
          await this.sleep(45);
        } else {
          await this.sleep(5);
        }
        this.actualValue = i;
      }
    }, 10);
  }
}
