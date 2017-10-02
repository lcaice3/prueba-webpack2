import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { async } from '@angular/core/testing';

@Component({
  selector: 'bdb-range-bar',
  templateUrl: './range-bar.component.html',
  styleUrls: ['./range-bar.component.css']
})
export class RangeBarComponent implements OnInit {

  @Input('max') max ;
  @Input('min') min;
  @Input('step') step = 100000;
  @Output('valueChange') valueChange = new EventEmitter();
  @Input('actualValue') actualValue;
  @Input('startValue') startValue ;
  range;
  firstTime = false;

  constructor() {
   }

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
      let increse = this.step;
      /** let increse = tihs.max / 100 */
      if(this.max > 50000000){
        increse = 2000000;
      }else if(this.max > 100000){
        increse = 500000;
      }
      for (let i = 0; i <= this.startValue; i += increse) {
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
