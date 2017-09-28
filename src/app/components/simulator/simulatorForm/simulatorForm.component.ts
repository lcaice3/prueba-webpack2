import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IncomeValidators } from './IncomeValidators';
import { Control } from '../../field-form/control';

@Component({
  selector: 'lbrz-simulator',
  templateUrl: './simulatorForm.component.html',
  styleUrls: ['./simulatorForm.component.css']
})
export class SimulatorFormComponent implements OnInit {


  data: Array<{ id: string, value: string }> = [
    { "id": "20000140", "value": "POLICIA PRUEBAS" },
    { "id": "20000182", "value": "PRUEBAS CALDAS" },
    { "id": "20000183", "value": "GOBERNACION PRUEBAS DEL VALLE" },
    { "id": "20000186", "value": "QBE PRUEBAS" },
    { "id": "20000187", "value": "TCC PRUEBAS" },
    { "id": "20000257", "value": "PRUEBAS CONVENIO 1" },
    { "id": "20000277", "value": "CONVENIO PRUEBAS" },
    { "id": "20000282", "value": "COMANDO GENERAL PRUEBAS" },
    { "id": "20000283", "value": "SANIDAD MILITAR PRUEBAS" },
    { "id": "20000288", "value": "GABINETE" },
    { "id": "20000294", "value": "LIBRANZAS PRUE PRUE" },
    { "id": "20000295", "value": "CASUR PRUEBAS" },
    { "id": "20000305", "value": "PUEBAS COMISIONES CENTRALES" },
    { "id": "20000306", "value": "P ESTUDIO DE CREDITO" },
    { "id": "20000307", "value": "COMI COMPARTIDO" },
    { "id": "20000308", "value": "FAS" },
    { "id": "20000312", "value": "NOGAS" },
    { "id": "330000277", "value": "QAL" }
  ];
  discountOverIncome = false;
  incomeInvalid = false;
  empresa = new Control(false, 'empresa', null);
  income = new Control(null, 'income', new FormControl('', [Validators.required, IncomeValidators.validateIncome]));
  discount = new Control(null, 'discount', new FormControl('', [Validators.required, IncomeValidators.validateDiscount]));
  type = new Control(null, 'type', null);
  campos: Array<Control> = [];
  form = new FormGroup(
    {
      income: this.income.formControl,
      discount: this.discount.formControl
    }
  );
  constructor(private router: Router) {
    this.campos.push(this.empresa);
    this.campos.push(this.income);
    this.campos.push(this.discount);
    this.campos.push(this.type);
  }

  ngOnInit() {
  }

  public onkeyUp(event, control: Control) {
    if (event.target.value.trim() == '$') {
      if (control.formControl) {
        control.formControl.setValue(null);
      }
      control.value = null;
    }
  }

  public getValue(val) {
    if (val === null) {
      this.empresa.value = null;
    } else {
      this.empresa.value = val.value;
    }
  }


  isIncomelast() {
    if (this.income.last == null || this.income.last) {
      return true;
    } else {
      return false;
    }
  }

  isEmpresaLast() {
    if (this.empresa.last == null || this.empresa.last) {
      return true;
    } else {
      return false;
    }
  }

  isDiscountlast() {
    if (this.discount.last == null || this.discount.last) {
      return true;
    } else {
      return false;
    }
  }

  validarCampoActual() {
    //return this.birthDate.value == null;
    let isInvalid = true;
    this.campos.forEach(campo => {
      if (campo.last == false) {
        if (campo.formControl != null) {
          isInvalid = campo.formControl.invalid;
        } else {
          if (campo.value == null || campo.value == '') {
            isInvalid = true;
          } else {
            isInvalid = this.validacionEspecifica(campo);
          }
        }
      }
    });
    return isInvalid;
  }

  validacionEspecifica(control: Control): boolean {
    const mayorEdad: number = 568080000000;
    const salarioMinimo = 737717
    let retorno;
    let incomeValue;
    let discountValue;

    switch (control.id) {
      case 'income':
        incomeValue = Number(control.formControl.value);
        retorno = incomeValue < salarioMinimo;
        this.incomeInvalid = retorno;
        break;
      case 'discount':
        incomeValue = Number(this.income.value.replace(/./g, (txt => this.quitarSimbolo(txt))));
        discountValue = Number(control.value.replace(/./g, (txt => this.quitarSimbolo(txt))));
        retorno = discountValue >= incomeValue;
        this.discountOverIncome = retorno;
        break;
    }
    return retorno;
  }

  private quitarSimbolo(txt: string): string {
    if (txt.match(/[0-9]/)) {
      return txt;
    } else {
      return '';
    }
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
          if (campo.value == 'No') {
            return;
          }
        }
        if (i == (this.campos.length - 1)) {
          this.router.navigate(['/simulator']);
          return;
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