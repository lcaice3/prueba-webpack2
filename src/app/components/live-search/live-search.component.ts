import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'bdb-live-search',
  templateUrl: './live-search.component.html',
  styleUrls: ['./live-search.component.css']
})
export class LiveSearchComponent implements OnInit {

  valorSeleccionado: string;
  caracterFaltante: number;

  @Input('options') opciones: Array<{id:string,value:string}>;
  @Input('disabled') disabled: false;
  @Output('valueChange') valueChange = new EventEmitter();
  
  ops: Array<{id:string,value:string}> = [];

  constructor() { 
    this.caracterFaltante = 0;
    this.valorSeleccionado = '';
  }

  ngOnInit() {
  }

  public seleccionarOpcion(opcion){
    this.valorSeleccionado = opcion.value;
    this.ops = [];
    this.valueChange.emit(opcion);
  }

  public limpiar(){
    this.valorSeleccionado = '';
    this.ops = [];
    this.valueChange.emit({id:'',value:''});
  }

  public  filtrar(){
    if(this.valorSeleccionado === ''){
      this.ops =[];
      return; 
    }
    if(this.valorSeleccionado.length < 3){
      this.caracterFaltante = 3 - this.valorSeleccionado.length;
      this.ops = [];
      return;
    }
    this.caracterFaltante = 0;
    this.ops = [];
    this.opciones.forEach(element => {
      if(element.value.toLowerCase().indexOf(this.valorSeleccionado.toLowerCase())>=0){
        this.ops.push(element);
      }
    });
  }
}
