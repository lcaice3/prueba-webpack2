import { Component, OnInit } from '@angular/core';
import { Control } from '../../models/control';

@Component({
  selector: 'lbrz-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css']
})
export class SimulatorComponent implements OnInit {


  data: Array<{id:string,value:string}> =[
    { "id": "20000140","value": "POLICIA PRUEBAS"},
    { "id": "20000182","value": "PRUEBAS CALDAS"},
    { "id": "20000183","value": "GOBERNACION PRUEBAS DEL VALLE"},
    { "id": "20000186","value": "QBE PRUEBAS"}, 
    { "id": "20000187","value": "TCC PRUEBAS"},
    { "id": "20000257","value": "PRUEBAS CONVENIO 1"},
    { "id": "20000277","value": "CONVENIO PRUEBAS"},
    { "id": "20000282","value": "COMANDO GENERAL PRUEBAS"},
    { "id": "20000283","value": "SANIDAD MILITAR PRUEBAS"},
    { "id": "20000288","value": "GABINETE"},
    { "id": "20000294","value": "LIBRANZAS PRUE PRUE"},
    { "id": "20000295","value": "CASUR PRUEBAS"},
    { "id": "20000305","value": "PUEBAS COMISIONES CENTRALES"},
    { "id": "20000306","value": "P ESTUDIO DE CREDITO"},
    { "id": "20000307","value": "COMI COMPARTIDO"},
    { "id": "20000308","value": "FAS"},
    { "id": "20000312","value": "NOGAS"},  
    { "id": "330000277","value": "QAL"}  
  ];
  empresa = new Control(false);
  income = new Control(null);
  discount = new Control(null);
  type = new Control(null);
  campos: Array<Control> = [];
  constructor() {
    this.campos.push(this.empresa);
    this.campos.push(this.income);
    this.campos.push(this.discount);
    this.campos.push(this.type);
  }

  ngOnInit() {
  }

  public onkeyUp(event, control: Control) {
    console.log(event.target.value);
    if (event.target.value == '$ 0') {
      control.value = null;
    }
  }

  public getValue(val){
    this.empresa.value = val;
  }


  isIncomelast() {
    if (this.income.last == null || this.income.last) {
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
          if (campo.value == 'No') {
            return;
          }
        }
        if (i == (this.campos.length - 1)) {
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
