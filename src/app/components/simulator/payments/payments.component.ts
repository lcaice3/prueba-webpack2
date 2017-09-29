import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'lbrz-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  @Input('open-modal')isModalOpenned = false;
  @Input('title')title = '';
  @Output('modalClosed')modalClosed = new EventEmitter();
  date = new Date();
  constructor() { }

  ngOnInit() {
  }

  openModal(){
    this.isModalOpenned = !this.isModalOpenned;
    this.modalClosed.emit(this.isModalOpenned);
  }


}
