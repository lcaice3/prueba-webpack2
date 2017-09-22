import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lbrz-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent implements OnInit {

  birthDate = { value: null, last: null }
  income = { value: null, last: null };
  contractType = { value: null, last: false };
  permanency = { value: null, last: null };
  rent = { value: null, last: null };
  relation = { value: null, last: null };
  family = { value: null, last: null };
  relationship = { value: null, last: null };
  campos: Array<{ value, last }> = [];
  constructor() {
    this.campos.push(this.birthDate);
    this.campos.push(this.income);
    this.campos.push(this.contractType);
    this.campos.push(this.permanency);
    this.campos.push(this.rent);
    this.campos.push(this.relation);
    this.campos.push(this.family);
    this.campos.push(this.relationship);
  }

  ngOnInit() {
  }


  isBirthDateLast() {
    if (this.birthDate.last == null || this.birthDate.last) {
      return true;
    } else {
      return false;
    }
  }

  isIncomelast() {
    if (this.income.last == null || this.income.last) {
      return true;
    } else {
      return false;
    }
  }

  isContractTypelast() {
    if (this.contractType.last == null || this.contractType.last) {
      return true;
    } else {
      return false;
    }
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

  /**
   * Lógica para verificar el campo actual y dar el comportamiento necesario 
   * para que el campo siguiente se muestre y el actual pase a segundo plano
   */
  onClick() {
    let campo;
    for (let i = 0; i < this.campos.length; i++) {
      campo = this.campos[i];
      if (campo.last == false) {
        if (i == (this.campos.length - 2)) {
          if( campo.value == 'no' ){
            return;
          }
        }
        campo.last = true;
        this.campos[i + 1].last = false;
        if (this.campos[i - 1]) {
          this.campos[i - 1].last = null;
        }
        return;
      }
    }
  }

  /**
   * Lógica para verificar el campo anterior y dar el comportamiento necesario 
   * para que el campo anterior se muestre y el actual pase a ser el anterior
   */
  onBack() {
    let campo;
    for (let i = 0; i < this.campos.length; i++) {
      campo = this.campos[i];
      if (campo.last == true) {
        campo.last = false;
        this.campos[i + 1].last = null;
        if (this.campos[i - 1]) {
          this.campos[i - 1].last = true;
        }
        return;
      }
    }
  }

}