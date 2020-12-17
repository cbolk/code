import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EserciziComponent } from './components/esercizi/esercizi.component';
import { EsercizioComponent } from './components/esercizio/esercizio.component';
import { AddEsercizioComponent } from './components/add-esercizio/add-esercizio.component';
import { EditEsercizioComponent } from './components/edit-esercizio/edit-esercizio.component';
import { AddLezioneComponent } from './components/add-lezione/add-lezione.component';

@NgModule({
  declarations: [
    AppComponent,
    EserciziComponent,
    EsercizioComponent,
    AddEsercizioComponent,
    EditEsercizioComponent,
    AddLezioneComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ColorPickerModule,
    BrowserModule,
    HttpClientModule,
    NgxPaginationModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
