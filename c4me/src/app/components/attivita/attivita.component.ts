import { Component, OnInit, TemplateRef, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CrudService } from './../../service/crud.service';

@Component({
  selector: 'app-attivita',
  templateUrl: './attivita.component.html',
  styleUrls: ['./attivita.component.css']
})
export class AttivitaComponent implements OnInit {

  attivitaForm: FormGroup;
  modalRef: BsModalRef;
  nuovoID : Number = -1;

  attivita : any = [];
  tipologia : any = [];

  currentAttivita: any = {id: null, data: new Date(), annoaccademico: -1, tipologia: '', titolo: '', argomento: '', numero: -1};
  modalCallback: () => void;

  constructor(private fb: FormBuilder,
              private modalService: BsModalService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private crudService: CrudService
  ) { 
    this.attivitaForm = this.fb.group({
      tipologia: [this.currentAttivita.tipologia, Validators.required],
      titolo: this.currentAttivita.titolo,
      argomento: this.currentAttivita.argomento,
      numero: this.currentAttivita.numero,
      data: [this.currentAttivita.data, Validators.required],
    })
  }

  ngOnInit() {
    this.getAllAttivita();
  }

  private updateForm() {
    this.attivitaForm.setValue({
      titolo: this.currentAttivita.titolo,
      tipologia: this.currentAttivita.tipologia,
      argomento: this.currentAttivita.argomento,
      numero: this.currentAttivita.numero,
      data: new Date(this.currentAttivita.data)
    });
  }

  private getAllAttivita(){
    this.crudService.getAllAttivita().subscribe(res => {
      this.attivita = res;
      console.log();
    });
  }

  addAttivita(template) {
    this.currentAttivita = {id: null, data: new Date(), annoaccademico: -1, tipologia: '', titolo: '', argomento: '', numero: -1};
    this.updateForm();
    this.modalCallback = this.createAttivita.bind(this);
    this.modalRef = this.modalService.show(template);
  }

  createAttivita() {
    const newAttivita = {
      id: null,
      data: this.attivitaForm.get('data').value,
      annoaccademico: -1,
      tipologia: this.attivitaForm.get('tipologia').value,
      titolo: this.attivitaForm.get('titolo').value,
      argomento: this.attivitaForm.get('argomento').value,
      numero: this.attivitaForm.get('numero').value,
    };
    this.modalRef.hide();
    this.crudService.addAttivita(newAttivita)
      .subscribe(() => {
        this.getAllAttivita();
    });
  }

  editAttivita(index, template) {
    this.currentAttivita = this.attivita[index];
    this.updateForm();
    this.modalCallback = this.updateAttivita.bind(this);
    this.modalRef = this.modalService.show(template);
  }

  updateAttivita() {
    const attivitaData = {
      id: this.currentAttivita.id,
      data: this.attivitaForm.get('data').value,
      titolo: this.attivitaForm.get('titolo').value,
      tipologia: this.attivitaForm.get('tipologia').value,
      argomento: this.attivitaForm.get('argomento').value,
      numero: this.attivitaForm.get('numero').value,
    };
    this.modalRef.hide();
    this.crudService.updateAttivita(this.currentAttivita.id, attivitaData).subscribe(() => {
        console.log('Attivita aggiornata successfully!');
        this.getAllAttivita();
      }, (err) => {
          console.log(err);
    });
  }




  deleteAttivita(index) {
    this.crudService.deleteAttivita(this.attivita[index]).subscribe(() => {
        console.log('Attivita eliminata successfully!');
        this.getAllAttivita();
      }, (err) => {
          console.log(err);
    });
  }

  onCancel() {
    this.modalRef.hide();
  }
}