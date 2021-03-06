import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { NgxTimelineModule } from 'ngx-timeline';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
   
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EserciziComponent } from './components/esercizi/esercizi.component';
import { EsercizioComponent } from './components/esercizio/esercizio.component';
import { AddEsercizioComponent } from './components/add-esercizio/add-esercizio.component';
import { EditEsercizioComponent } from './components/edit-esercizio/edit-esercizio.component';
import { AddLezioneComponent } from './components/add-lezione/add-lezione.component';
import { LezioneComponent } from './components/lezione/lezione.component';
import { AttivitaComponent } from './components/attivita/attivita.component';
import { TimelineComponent } from './components/timeline/timeline.component';


@NgModule({
  declarations: [
    AppComponent,
    EserciziComponent,
    EsercizioComponent,
    AddEsercizioComponent,
    EditEsercizioComponent,
    AddLezioneComponent,
    AttivitaComponent,
    LezioneComponent,
    TimelineComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ColorPickerModule,
    BrowserModule,
    HttpClientModule,
    NgxPaginationModule,
    BsDatepickerModule.forRoot(),
    NgxTimelineModule,
    ModalModule.forRoot(),
    NgbModule,
    AppRoutingModule
  ],
  providers: [
    BsModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
