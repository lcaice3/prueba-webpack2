import { Component } from '@angular/core';

@Component({
  selector: 'lbrz-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lbrz';
  component = null;

  onRouteChange(component) {
    this.component = component;
  }
}
