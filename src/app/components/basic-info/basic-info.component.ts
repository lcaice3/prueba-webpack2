import { Component, OnInit, ViewChild, Renderer, ElementRef } from '@angular/core';
import { Control } from '../../models/control';

@Component({
  selector: 'lbrz-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent implements OnInit {

  @ViewChild('inputMes') inputMes: ElementRef;
  @ViewChild('maskMes') maskMes: ElementRef;
  @ViewChild('maskMes2') maskMes2: ElementRef;

  birthDate = new Control(null, 'birthDate');
  income = new Control(null, 'income');
  contractType = new Control(null, 'contractType');
  permanency = new Control(false, 'permanency');
  rent = new Control(null, 'rent');
  relation = new Control(null, 'relation');
  family = new Control(null, 'family');
  relationship = new Control(null, 'relationship');
  campos: Array<Control> = [];
  constructor(private renderer: Renderer) {
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

  setFocus() {
    this.renderer.invokeElementMethod(this.inputMes.nativeElement, 'focus');
  }

  /**
   * Método encargado de transformar un texto de modo que contenga únicamente números
   * @param txt 
   */
  private onlyNumbers(txt: String): String {
    let r = txt.toLowerCase();
    r = r.replace(new RegExp(/\s/g), "");
    r = r.replace(new RegExp(/[àáâãäå]/g), "");
    r = r.replace(new RegExp(/[èéêë]/g), "");
    r = r.replace(new RegExp(/[ìíîï]/g), "");
    r = r.replace(new RegExp(/ñ/g), "");
    r = r.replace(new RegExp(/[òóôõö]/g), "");
    r = r.replace(new RegExp(/[ùúûü]/g), "");
    r = r.replace(/&nbsp;/g, "").
      replace(/&amp;/g, "").
      replace(/&lt;/g, "").
      replace(/&gt;/g, "").
      replace(/<br>/g, "").
      replace(/´/g, "").
      replace(/¨/g, "").
      replace(/\^/g, "").
      replace(/¸/g, "").
      replace(/ø/g, "").
      replace(/`/g, "")
    return r;
  }

  public onDivChange(event) {
    const otherKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Backspace', 'Delete', 'Control', 'Alt', 'Meta', 'Shift'];
    let value: String = this.onlyNumbers(this.inputMes.nativeElement.innerHTML);
    let limpiar = true;
    for (let i = 0; i <= 9; i++) {
      if (event.key == i + '') {
        limpiar = false;
      }
    }
    if (otherKeys.includes(event.key)) {
      limpiar = false;
    }
    if (limpiar) {
      this.inputMes.nativeElement.innerHTML = value.replace(event.key.toLowerCase(), '');
      return;
    }
    if (value.trim() == '1') {
      this.maskMes.nativeElement.innerHTML = 'mes';
      this.maskMes2.nativeElement.innerHTML = 'mes';
    } else {
      this.maskMes.nativeElement.innerHTML = 'meses';
      this.maskMes2.nativeElement.innerHTML = 'meses';
    }
    this.permanency.value = this.inputMes.nativeElement.innerHTML;

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
        if (campo.value == null || campo.value == '') {
          isInvalid = true;
        } else {
          isInvalid = this.validacionEspecifica(campo);
        }
      }
    });
    return isInvalid;
  }

  validacionEspecifica(control: Control): boolean {
    const mayorEdad: number = 568080000000;
    const salarioMinimo = 737717
    let retorno;

    switch (control.id) {
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
          } else {
            retorno = true;
          }
        } else {
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
