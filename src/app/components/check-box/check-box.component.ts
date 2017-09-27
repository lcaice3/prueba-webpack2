import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bdb-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.css']
})
export class CheckBoxComponent implements OnInit {
  @Input('label') label: String;
  constructor() { }

  ngOnInit() {
  }

}
