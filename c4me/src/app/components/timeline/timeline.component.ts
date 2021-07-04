import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from './../../service/crud.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  form: FormGroup;
  modalRef: BsModalRef;
  aacorso: Number = 0;
  events: any[] = [];
  currentEvent: any = {id: null, titolo: '', argomento: '', tipologia: '', data: new Date().toLocaleDateString('it-IT'), numero: '', ore: '', cb: ''};
  modalCallback: () => void;

  constructor(private fb: FormBuilder,
              private modalService: BsModalService,
              private crudService: CrudService
  ) { 
      var oggi = new Date();
      var aa = oggi.getFullYear();
      var nuovoaa = new Date(aa + '-09-15');
      var nuovoa = new Date(aa + '-01-01');
      if (oggi < nuovoaa && oggi >= nuovoa)
        aa = aa - 1;
      this.aacorso = aa;
  }

  ngOnInit() {
    this.form = this.fb.group({
      titolo: [this.currentEvent.titolo, Validators.required],
      argomento: this.currentEvent.argomento,
      tipologia: this.currentEvent.tipologia,
      numero: this.currentEvent.numero,
      ore: this.currentEvent.ore,
      cb: this.currentEvent.cb,
      data: [this.currentEvent.data, Validators.required],
    });
    this.getEventsYear();
  }

  private updateForm() {
    this.form.setValue({
      titolo: this.currentEvent.titolo,
      argomento: this.currentEvent.argomento,
      tipologia: this.currentEvent.tipologia,
      numero: this.currentEvent.numero,
      ore: this.currentEvent.ore,
      cb: this.currentEvent.cb,
      data: new Date(this.currentEvent.data)
    });
  }

  private getEvents() {
    this.crudService.getEvents().subscribe((response: any) => {
      console.log('Response', response);
      this.events = response.map((ev) => {
        ev.chi = ev.cb;
        ev.durata = ev.ore;
        ev.ordine = ev.numero;
        ev.tipo = ev.tipologia;
        ev.body = ev.argomento;
        ev.titolo = ev.titolo;
        ev.header = ev.titolo;
        if(ev.tipo == "lezione")
          ev.icon = 'fa-chalkboard-teacher';
        else if (ev.tipo == "esercitazione")
          ev.icon = 'fa-chalkboard';
        else if (ev.tipo == "laboratorio")
          ev.icon = 'fa-laptop-code';
        else if (ev.tipo == "analisi soluzioni")
          ev.icon = 'fa-search-plus';
        else if (ev.tipo == "intrattenimento")
          ev.icon = 'fa-grin-stars';
        else if (ev.tipo == "esame")
          ev.icon = 'fa-edit';
        else if (ev.tipo == "altro")
          ev.icon = 'fa-clock-o';
        ev.date = ev.data;
        return ev;
      });
    });
  }

  private getEventsYear() {
    this.crudService.getEventsYear(this.aacorso).subscribe((response: any) => {
      console.log('Response', response);
      this.events = response.map((ev) => {
        if (ev.cb == 1)
          ev.chi = 'far fa-user-circle';
        else
          ev.chi = 'fas fa-user-circle';
        ev.durata = ev.ore;
        ev.ordine = ev.numero;
        ev.tipo = ev.tipologia;
        if (ev.argomento != null)
          ev.body = ev.argomento.replace(/code/g,"tt");
        if (ev.titolo != null)
          ev.titolo = ev.titolo.replace(/code/g,"tt");
        ev.header = '';
        if(ev.tipo == "lezione"){
          ev.icon = 'fa-chalkboard-teacher';
          ev.color = 'primary'
        } else if (ev.tipo == "esercitazione"){
          ev.icon = 'fa-user-cog';
          ev.color = 'success'
        } else if (ev.tipo == "laboratorio"){
          ev.icon = 'fa-laptop-code';
          ev.color = 'info'
        } else if (ev.tipo == "analisi soluzioni"){
          ev.icon = 'fa-user-edit';
          ev.color = 'warning'
        } else if (ev.tipo == "intrattenimento"){
          ev.icon = 'fa-grin-stars';
          ev.color = 'primary'
        } else if (ev.tipo == "esame"){
          ev.icon = 'fa-edit';
          ev.color = 'secondary'
        } else if (ev.tipo == "altro"){
          ev.icon = 'fa-clock-o';
          ev.color = 'danger'
        }
        ev.date = ev.data;
        return ev;
      });
    });
  }

  addEvent(template) {
    this.currentEvent = {id: null, titolo: '', argomento: '', tipologia: '', data: new Date(), numero: '', ore: '', cb: ''};
    this.updateForm();
    this.modalCallback = this.createEvent.bind(this);
    this.modalRef = this.modalService.show(template);
  }

  createEvent() {
    const newEvent = {
      titolo: this.form.get('titolo').value,
      argomento: this.form.get('argomento').value,
      tipologia: this.form.get('tipologia').value,
      numero: this.form.get('numero').value,
      ore: this.form.get('ore').value,
      cb: this.form.get('cb').value,
      data: this.form.get('data').value,
    };
    this.modalRef.hide();
    this.crudService.createEvent(newEvent).subscribe(() => {
      this.getEventsYear();
    });
  }

  editEvent(index, template) {
    this.currentEvent = this.events[index];
    this.updateForm();
    this.modalCallback = this.updateEvent.bind(this);
    this.modalRef = this.modalService.show(template);
  }

  updateEvent() {
    const eventData = {
      id: this.currentEvent.id,
      titolo: this.form.get('titolo').value,
      argomento: this.form.get('argomento').value,
     tipologia: this.form.get('tipologia').value,
     numero: this.form.get('numero').value,
     ore: this.form.get('ore').value,
     cb: this.form.get('cb').value,
     data: this.form.get('data').value,
    };
    this.modalRef.hide();
    this.crudService.updateEvent(eventData).subscribe(() => {
      this.getEvents();
    });
  }

  deleteEvent(index) {
    this.crudService.deleteEvent(this.events[index]).subscribe(() => {
      this.getEvents();
    });
  }

  onCancel() {
    this.modalRef.hide();
  }

  dateFormatting(val: any): string {
    if (val instanceof Date) {
      return (<Date>val).toLocaleString('it-IT');
  }

}

}
