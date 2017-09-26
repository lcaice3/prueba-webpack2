import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { NavComponent } from './components/nav/nav.component';
import { AppRoutingModule } from './app-routing.module';
import { DocumentDirective } from './directives/document.directive';
import { BasicInfoComponent } from './components/basic-info/basic-info.component';
 
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FieldFormComponent } from './components/field-form/field-form.component';
import { DocumentNumberComponent } from './components/document-number/document-number.component';
import { ModalDuccComponent } from './components/modal-ducc/modal-ducc.component';

import { LiveSearchComponent } from './components/live-search/live-search.component';
import { SimulatorComponent } from './components/simulator/simulator.component';
import { CheckBoxComponent } from './components/check-box/check-box.component';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { CustomerService } from './services/customer.service';
import { HttpModule } from '@angular/http';
import { CurrencyDirective } from './directives/currency.directive';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavComponent,
    DocumentDirective,
    BasicInfoComponent,
    FieldFormComponent,
    DocumentNumberComponent,
    ModalDuccComponent,
    CheckBoxComponent,
    LiveSearchComponent,
    DocumentNumberComponent,
    SimulatorComponent,
    CurrencyDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CurrencyMaskModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
