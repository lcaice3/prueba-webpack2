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

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavComponent,
    DocumentDirective,
    BasicInfoComponent,
    FieldFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
