import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EserciziComponent } from './components/esercizi/esercizi.component';
import { EsercizioComponent } from './components/esercizio/esercizio.component';
import { AddEsercizioComponent } from './components/add-esercizio/add-esercizio.component';
import { EditEsercizioComponent } from './components/edit-esercizio/edit-esercizio.component';


const routes: Routes = [
//  { path: '', pathMatch: 'full', redirectTo: 'esercizi' },
{ path: 'esercizi', component: EserciziComponent },
{ path: 'esercizio/:id', component: EsercizioComponent },
{ path: 'add-esercizio', component: AddEsercizioComponent },
{ path: 'edit-esercizio/:id', component: EditEsercizioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
