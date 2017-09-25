import { Component, OnInit } from '@angular/core';
import { Control } from '../../models/control';

@Component({
  selector: 'lbrz-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent implements OnInit {

  birthDate = new Control(false, 'birthDate');
  income = new Control(null,'income');
  contractType = new Control(null, 'contractType');
  permanency = new Control(null,'permanency');
  rent = new Control(null,'rent');
  relation = new Control(null,'relation');
  family = new Control(null,'family');
  relationship = new Control(null,'relationship');
  campos: Array<Control> = [];
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

  public onkeyUp(event, control: Control) {
    if (event.target.value == '$ 0') {
      control.value = null;
    }
  }

  toBeOld() {
    let fecha = this.get18years();
    return fecha.toJSON().split('T')[0];
  }

  private get18years(): Date {
    let fecha = new Date();
    fecha.setFullYear(fecha.getFullYear() - 18);
    return fecha;
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

  validarCampoActual() {
    //return this.birthDate.value == null;
    let isInvalid = true;
    this.campos.forEach(campo => {
      if (campo.last == false) {
        if(campo.value == null || campo.value == ''){
          isInvalid = true;
        }else{
          isInvalid = this.validacionEspecifica(campo);
        }
      }
    });
    return isInvalid;
  }

  validacionEspecifica(control: Control): boolean{
    const mayorEdad: number = 568080000000;
    const salarioMinimo = 737717
    let retorno;

    switch(control.id){
      case 'income':
      retorno = control.value < salarioMinimo;
      break;
      case 'birthDate':
        // Verificación de campo date, si tiene el formato YYYY-mm-dd se verifica si es mayor de edad.
      if (typeof (control.value) == 'string' && (control.value as string).match(/\d\d\d\d-\d\d-\d\d/g)) {
        let hoy = new Date();
        let fechaSeleccionada = new Date(control.value);
        if ((hoy.getTime() - fechaSeleccionada.getTime()) >= mayorEdad) {
          retorno = false;
        }else{
          retorno = true;
        }
      }else{
        retorno = true;
      }
      break;
    }
    return retorno;
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
