import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Payment } from '../../../models/payment';
import { SimulatorService } from '../../../services/simulator.service';

@Component({
  selector: 'lbrz-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  @Input('open-modal')isModalOpenned = false;
  @Input('title')title = '';
  @Input('vtua')vtua = 0;
  @Input('actualLoan')actualLoan = 0;
  @Input('payments')payments: Array<Payment> = [];
  @Output('modalClosed')modalClosed = new EventEmitter();
  date = new Date();
  @Input('perVtua')perVtua = 0;

  constructor(private simulatorService:SimulatorService ) { }

  ngOnInit() {
  }

  public abs(value:number){
    return Math.abs(value);
  }

  openModal(){
    this.isModalOpenned = !this.isModalOpenned;
    this.modalClosed.emit(this.isModalOpenned);
  }


}
