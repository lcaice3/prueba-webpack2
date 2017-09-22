import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lbrz-document-number',
  templateUrl: './document-number.component.html',
  styleUrls: ['./document-number.component.css']
})
export class DocumentNumberComponent implements OnInit {
  identityNumber = { value: null, last: null };
  campos: Array<{ value, last }> = [];
  constructor() { 
    this.campos.push(this.identityNumber);
  }

  ngOnInit() {
  }

  validarCampoActual(formulario) {
    //return this.birthDate.value == null;
    let isInvalid = true;
    this.campos.forEach(campo => {
      if (campo.last == false) {
        isInvalid = campo.value == null;
      }
    });
    return isInvalid;
  }
  onClick() {}

}
