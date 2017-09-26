import { Directive, HostListener, ElementRef, Component } from '@angular/core';

@Directive({
  selector: '[bdb-document]'
})
export class DocumentDirective {

  constructor(protected valNit: ElementRef) { }

  @HostListener('keyup')
  onKeyPressNit() {
    this.valNit.nativeElement.value = this.addSeparatorsOnKeyUp();
  }

  @HostListener('blur')
  onblurNit() {
    this.valNit.nativeElement.value = this.addSeparator();
  }

  @HostListener('keydown', ['$event'])
  onKeyDownNit(event: KeyboardEvent) {
    if ((event.code === 'ArrowLeft') || (event.code === 'ArrowRight') ||
      (event.code === 'ArrowUp') || (event.code === 'ArrowDown') ||
      (event.code === 'Delete') || (event.code === 'Backspace')) {
      return;
    } else if (event.key.search(/\d/) === -1) {
      event.preventDefault();
    }
  }

  protected addSeparator(): string {
    const value: string = this.valNit.nativeElement.value;
    return value.replace(/\D/g, '')
      .replace(/./g, (txt => this.letOnlyNumbers(txt)))
      .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, '.');
  }
  protected addSeparatorsOnKeyUp(): string {
    const value: string = this.replaceSpecialChars(this.valNit.nativeElement.value);
    return value.replace(/\D/g, '')
      .replace(/./g, (txt => this.letOnlyNumbers(txt)))
      .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, '.');
  }

    /**
   * Método encargado de transformar un texto de modo que contenga únicamente números
   * @param txt
   */
  private replaceSpecialChars(txt: string): string {
    let r = txt.toLowerCase();
    r = r.replace(new RegExp(/\s/g), '');
    r = r.replace(new RegExp(/[àáâãäå]/g), '');
    r = r.replace(new RegExp(/[èéêë]/g), '');
    r = r.replace(new RegExp(/[ìíîï]/g), '');
    r = r.replace(new RegExp(/ñ/g), '');
    r = r.replace(new RegExp(/[òóôõö]/g), '');
    r = r.replace(new RegExp(/[ùúûü]/g), '');
    r = r.replace(/&nbsp;/g, '').
      replace(/&amp;/g, '').
      replace(/&lt;/g, '').
      replace(/&gt;/g, '').
      replace(/<br>/g, '').
      replace(/´/g, '').
      replace(/¨/g, '').
      replace(/\^/g, '').
      replace(/¸/g, '').
      replace(/ø/g, '').
      replace(/`/g, '');
    return r;
  }

  protected letOnlyNumbers(txt: string): string {
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
