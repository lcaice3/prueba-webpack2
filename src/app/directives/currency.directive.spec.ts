import { CurrencyDirective } from './currency.directive';
import { ElementRef } from '@angular/core';

describe('CurrencyDirective', () => {
  it('should create an instance', () => {
    // TODO: Real unit test
    const element = new ElementRef("hola");
    const directive = new CurrencyDirective(element);
    expect(directive).toBeTruthy();
  });
});
