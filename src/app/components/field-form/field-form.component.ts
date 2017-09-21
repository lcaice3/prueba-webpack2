import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bdb-field-form',
  templateUrl: './field-form.component.html',
  styleUrls: ['./field-form.component.css']
})
export class FieldFormComponent implements OnInit {

  @Input('anterior') anterior: Boolean;
  @Output('back') back = new EventEmitter();
  
    constructor() { }
  
    ngOnInit() {
    }
  
    public isAnterior():Boolean{
      return this.anterior;
    }
    public isVisible():Boolean{
      return this.anterior != null;
    }

    public emitBack(){
      this.back.emit();
    }

}
