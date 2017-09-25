import { Directive, HostListener, ElementRef, Component } from '@angular/core';

@Directive({
  selector: '[bdb-document]'
})
export class DocumentDirective {

  constructor(protected valNit: ElementRef) { }

  @HostListener('keyup')
  onKeyPressNit() {
    this.valNit.nativeElement.value = this.agregarPuntosKeyUp();
  }

  @HostListener('blur')
  onblurNit() {
   // this.valNit.nativeElement.value = this.agregarPuntos();
  }

  protected agregarPuntos(): string {
    let value: string = this.valNit.nativeElement.value;
    return value.replace(/\D/g, '')
      .replace(/./g, (txt => this.quitarSimbolos(txt)))
      .replace(/\B(?=(\d{2})+(?!\d)\.?)/g, ".");
  }
  protected agregarPuntosKeyUp(): string {
    let value: string = this.valNit.nativeElement.value;
    return value.replace(/\D/g, '')
      .replace(/./g, (txt => this.quitarSimbolos(txt)))
      .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
  }

  protected quitarSimbolos(txt: string): string {
    if (txt.match(/[0-9]/)) {
      return txt;
    } else {
      return '';
    }
  }

  set value(value: string) {
    this.valNit.nativeElement.value = value;
  }

  get value() {
    return this.valNit.nativeElement.value;
  }

}