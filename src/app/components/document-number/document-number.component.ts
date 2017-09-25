import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lbrz-document-number',
  templateUrl: './document-number.component.html',
  styleUrls: ['./document-number.component.css']
})
export class DocumentNumberComponent implements OnInit {
  cedulam: String;
  clicked = false;
  ischeck: boolean;
  constructor(private router: Router) { 
    
  }

  ngOnInit() {
  }

  public closeModal() {
    //localStorage.clear();
    this.router.navigate(['/welcome']);
    this.clicked = false;
  }

  public showModal(){
    this.clicked=true;
  }
  
}
