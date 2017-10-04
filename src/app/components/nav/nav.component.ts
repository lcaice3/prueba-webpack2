import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { MainComponent } from '../main/main.component';
import { BasicInfoComponent } from '../basic-info/basic-info.component';
import { SimulatorComponent } from '../simulator/simulator.component';
import { SimulatorFormComponent } from '../simulator/simulatorForm/simulatorForm.component';
import { DocumentNumberComponent } from '../document-number/document-number.component';

@Component({
  selector: 'lbrz-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Input('component') component;
  @Output('valueChange') valueChange = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

  isBasicInfo():boolean{
    return this.component instanceof BasicInfoComponent;
  }

  isSteps():boolean{
    return this.component instanceof SimulatorFormComponent || this.component instanceof DocumentNumberComponent;
  }

  isSimulator():boolean{
    return this.component instanceof SimulatorComponent;
  }

}
