import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EserciziComponent } from './components/esercizi/esercizi.component';
import { AddEsercizioComponent } from './components/add-esercizio/add-esercizio.component';
import { EsercizioComponent } from './components/esercizio/esercizio.component';

@NgModule({
  declarations: [
    AppComponent,
    EserciziComponent,
    AddEsercizioComponent,
    EsercizioComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
