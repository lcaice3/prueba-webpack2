import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordComponent } from './components/password/password.component';
import { DebitCardComponent } from './components/debit-card/debit-card.component';
import { SecurePasswordComponent } from './components/secure-password/secure-password.component';
import { ExternalOtpComponent } from './components/external-otp/external-otp.component';
import { LoginComponent } from './login.component';
import { ConfrontComponent } from './components/confront/confront.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PasswordComponent, DebitCardComponent, SecurePasswordComponent, ExternalOtpComponent, LoginComponent, ConfrontComponent]
})
export class LoginModule { }
