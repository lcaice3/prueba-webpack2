import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lbrz-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent implements OnInit {

  birthdate: Date;
  constructor() { }

  ngOnInit() {
  }

}
