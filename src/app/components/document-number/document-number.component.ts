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
    this.customerService.userCRM(this.cedulam).subscribe((response)=>{
      if(response.isInBlacklist==false && response.isCustomer== true){
        this.router.navigate(['/basic-info']);
      }
      else{
        this.showModal();
      }
    });
  }
  
}
