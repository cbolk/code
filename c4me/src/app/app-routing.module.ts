import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EserciziComponent } from './components/esercizi/esercizi.component';


const routes: Routes = [
//  { path: '', pathMatch: 'full', redirectTo: 'esercizi' },
  { path: 'esercizi', component: EserciziComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
