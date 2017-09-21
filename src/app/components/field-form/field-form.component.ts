import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bdb-field-form',
  templateUrl: './field-form.component.html',
  styleUrls: ['./field-form.component.css']
})
export class FieldFormComponent implements OnInit {

  @Input('anterior') anterior: boolean;
  
    constructor() { }
  
    ngOnInit() {
    }
  
    public isAnterior():boolean{
      return this.anterior;
    }
}
