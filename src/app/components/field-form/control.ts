
import {  FormControl} from '@angular/forms';

export class Control {
    value;
    last;
    id;
    formControl: FormControl

    constructor(last, id, formControl){
        this.value = null;
        this.last = last;
        this.id = id;
        this.formControl = formControl;
    }

    

}