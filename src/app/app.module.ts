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
import { CheckBoxComponent } from './components/check-box/check-box.component';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { DocumentNumberComponent } from './components/document-number/document-number.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavComponent,
    DocumentDirective,
    BasicInfoComponent,
    FieldFormComponent,
    CheckBoxComponent,
    DocumentNumberComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    CurrencyMaskModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
