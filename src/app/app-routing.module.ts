import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { BasicInfoComponent } from './components/basic-info/basic-info.component';
import { DocumentNumberComponent } from './components/document-number/document-number.component';
import { SimulatorFormComponent } from './components/simulator/simulatorForm/simulatorForm.component';
import { SimulatorComponent } from './components/simulator/simulator.component';
import { PaymentsComponent } from './components/simulator/payments/payments.component';
import { LoginComponent } from './modules/login/login.component';
const appRoutes: Routes = [
    { path: '', redirectTo: '/welcome', pathMatch: 'full' },
    { path: 'welcome', component: SimulatorFormComponent },
    { path: 'simulator', component: SimulatorComponent },
    { path: 'basic-info', component:  BasicInfoComponent},
    { path: 'document-number', component: DocumentNumberComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo:"/welcome"}
  ];
  
  
  @NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }