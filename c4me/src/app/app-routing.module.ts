import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EserciziComponent } from './components/esercizi/esercizi.component';
import { EsercizioComponent } from './components/esercizio/esercizio.component';
import { AddEsercizioComponent } from './components/add-esercizio/add-esercizio.component';
import { EditEsercizioComponent } from './components/edit-esercizio/edit-esercizio.component';
import { AddLezioneComponent } from './components/add-lezione/add-lezione.component';
import { LezioneComponent } from './components/lezione/lezione.component';
import { AttivitaComponent } from './components/attivita/attivita.component';
import { TimelineComponent } from './components/timeline/timeline.component';


const routes: Routes = [
//{ path: '', pathMatch: 'full', redirectTo: 'esercizi' },
{ path: 'timeline/:idanno', component: TimelineComponent },
{ path: 'attivita', component: AttivitaComponent },
{ path: 'esercizi', component: EserciziComponent },
{ path: 'esercizio/:id', component: EsercizioComponent },
{ path: 'add-esercizio', component: AddEsercizioComponent },
{ path: 'edit-esercizio/:id', component: EditEsercizioComponent },
{ path: 'add-lezione', component: AddLezioneComponent },
{ path: 'lezione/:id', component: LezioneComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
