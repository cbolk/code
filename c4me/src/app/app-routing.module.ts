import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EserciziComponent } from './components/esercizi/esercizi.component';
import { EsercizioComponent } from './components/esercizio/esercizio.component';
import { AddEsercizioComponent } from './components/add-esercizio/add-esercizio.component';


const routes: Routes = [
//  { path: '', pathMatch: 'full', redirectTo: 'esercizi' },
{ path: 'add-esercizio', component: AddEsercizioComponent },
{ path: 'esercizio/:id', component: EsercizioComponent },
  { path: 'esercizi', component: EserciziComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
