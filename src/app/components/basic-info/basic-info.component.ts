import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lbrz-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent implements OnInit {

  birthDate = {value: null, last: false}
  income = {value: null, last: null};
  contractType = { value: null, last: null};
  permanency = { value: null, last: null};
  rent = { value: null, last: null};
  relation = { value: null, last: null};
  campos: Array<{value,last}> =[] ;
  constructor() { 
    this.campos.push(this.birthDate);
    this.campos.push(this.income);
    this.campos.push(this.contractType);
    this.campos.push(this.permanency);
    this.campos.push(this.relation);
    this.campos.push(this.rent);
  }

  ngOnInit() {
  }


  isBirthDateLast(){
    if(this.birthDate.last == null || this.birthDate.last){
      return true;
    }else{
      return false;
    }
  }

  isIncomelast(){
    if(this.income.last == null || this.income.last){
      return true;
    }else{
      return false;
    }
  }

  isContractTypelast(){
    if(this.contractType.last == null || this.contractType.last){
      return true;
    }else{
      return false;
    }
  }

  validarCampoActual(formulario){
    //return this.birthDate.value == null;
    let isInvalid = true;
    this.campos.forEach(campo => {
      if(campo.last == false){  
        isInvalid = campo.value == null;
      }
    });
    return isInvalid;
  }

  onClick(){
    let campo;
    for(let i = 0; i < this.campos.length; i++){
      campo = this.campos[i];
      if(campo.last == false){
         campo.last = true;
         this.campos[i+1].last = false;
         if(this.campos[i-1]){
          this.campos[i-1].last = null;
         }
         return;
      }
    }
  }

  onBack(){
    let campo;
    for(let i = 0; i < this.campos.length; i++){
      campo = this.campos[i];
      if(campo.last == true){
         campo.last = false;
         this.campos[i+1].last = null;
         if(this.campos[i-1]){
          this.campos[i-1].last = true;
         }
         return;
      }
    }
  }

}
