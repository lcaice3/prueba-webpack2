import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { NavComponent } from './components/nav/nav.component';
import { AppRoutingModule } from './app-routing.module';
import { DocumentDirective } from './directives/document.directive';
import { BasicInfoComponent } from './components/basic-info/basic-info.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavComponent,
    DocumentDirective,
    BasicInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
