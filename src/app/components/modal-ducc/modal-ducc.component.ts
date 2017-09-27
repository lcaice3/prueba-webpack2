import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'bdb-modal-ducc',
  templateUrl: './modal-ducc.component.html',
  styleUrls: ['./modal-ducc.component.css']
})
export class ModalDuccComponent implements OnInit {

  @Input('clicked') isClicked = false;  
  @Output('onClose') onCLose = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

  public close() {
    this.isClicked = false;
    this.onCLose.emit(false);
  }

}
