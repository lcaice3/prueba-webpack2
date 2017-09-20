import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { BasicInfoComponent } from './components/basic-info/basic-info.component';
const appRoutes: Routes = [
    { path: '', redirectTo: '/welcome', pathMatch: 'full' },
    { path: 'welcome', component: BasicInfoComponent },
    { path: '**', redirectTo:"/welcome"}
  ];
  
  
  @NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }