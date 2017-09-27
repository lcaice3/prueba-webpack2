import { AbstractControl, ValidationErrors, FormControl } from '@angular/forms';

export class IncomeValidators {

    static validateIncome(control: AbstractControl): ValidationErrors | null {
        const salarioMinimo = 737717;
        if (control.value == null) {
            return { incomeInvalid: 'El salario debe ser superior al salario mínimo legal vigente ($737.717).' };
        }
        let income = Number(control.value.replace(/./g, (txt => {
            if (txt.match(/[0-9]/)) {
                return txt;
            } else {
                return '';
            }
        })));
        if (income < salarioMinimo) {
            return { incomeInvalid: 'El salario debe ser superior al salario mínimo legal vigente ($737.717).' };
        }
    }

    static validateDiscount(control: AbstractControl): ValidationErrors | null {
        if (control.parent == null || typeof (control.parent) === 'undefined' || control == null || typeof (control) === 'undefined' || control.value == null) {
            return null;
        }
        let formulario = control.parent;
        let income = formulario.get('income').value;
        if (income == null) {
            return null;
        }
        let discount = Number(control.value.replace(/./g, (txt => {
            if (txt.match(/[0-9]/)) {
                return txt;
            } else {
                return '';
            }
        }
        )));
        let incomeValue = Number(income.replace(/./g, (txt => {
            if (txt.match(/[0-9]/)) {
                return txt;
            } else {
                return '';
            }
        })));
        if (discount == 0) {
            return;
        }
        if (incomeValue <= discount) {
            return { discountInvalid: 'Los descuentos de nómina no pueden ser iguales o superiores al salario.' };
        }
        return null;
    }

    static getNum(txt) {
        if (txt.match(/[0-9]/)) {
            return txt;
        } else {
            return '';
        }
    }



}