import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { MainComponent } from '../main/main.component';

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

}
