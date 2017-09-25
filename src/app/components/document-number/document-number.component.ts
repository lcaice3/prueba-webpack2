import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'lbrz-document-number',
  templateUrl: './document-number.component.html',
  styleUrls: ['./document-number.component.css']
})
export class DocumentNumberComponent implements OnInit {
  cedulam: String;
  clicked = false;
  ischeck: boolean;
  constructor(private router: Router, private customerService: CustomerService) { 
    
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

  public shareCurtomer(){
    let valor = Number(this.cedulam.replace(/./g, (txt => this.quitarSimbolo(txt))));
    this.customerService.userCRM(valor).subscribe((response)=>{
      if(response.isCustomer== true){
        if(response.isInBlacklist==false){
          //TODO: AUtenticar con clave segura/tarjeta debito 
          this.router.navigate(['/basic-info']);
        } else  {
          this.showModal();
        }
      } else {
        //TODO: Autenticar con cifin
        this.router.navigate(['/basic-info']);
      }
    });
  }
  
  private quitarSimbolo(txt: string): string {
    if (txt.match(/[0-9]/)) {
      return txt;
    } else {
      return '';
    }
  }
}
