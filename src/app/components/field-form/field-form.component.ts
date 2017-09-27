import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Control } from './control';

@Component({
  selector: 'bdb-field-form',
  templateUrl: './field-form.component.html',
  styleUrls: ['./field-form.component.css']
})
export class FieldFormComponent implements OnInit {

  @Input('control') control: Control;
  @Output('back') back = new EventEmitter();
  @Input('label') label = '';
  @Input('mask') mask = '';
  
    constructor() { }
  
    ngOnInit() {
    }
  
    public isAnterior():Boolean{
      return this.control.last;
    }
    public isVisible():Boolean{
      return this.control.last != null;
    }

    public emitBack(){
      this.back.emit();
    }

}
