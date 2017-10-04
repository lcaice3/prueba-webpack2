import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bdb-external-otp',
  templateUrl: './external-otp.component.html',
  styleUrls: ['./external-otp.component.css']
})
export class ExternalOtpComponent implements OnInit {

  actualTime = 60;
  time = 60;
  color = '#6fdb6f';
  strokeDashoffset = 0;
  constructor() { }

  ngOnInit() {
    setTimeout(
      async ()=>{
        await this.sleep(1000);
        for(let i = 1; i <= this.time ; i++){
          this.strokeDashoffset = i*440/this.time;
          await this.sleep(1000);
          this.actualTime--;
          if(this.actualTime == 50){
            this.color = '#b90808';
          }
        }
      },0
    );
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


}
