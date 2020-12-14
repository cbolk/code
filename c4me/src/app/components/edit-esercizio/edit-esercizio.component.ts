import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from './../../service/crud.service';
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-edit-esercizio',
  templateUrl: './edit-esercizio.component.html',
  styleUrls: ['./edit-esercizio.component.css']
})
export class EditEsercizioComponent implements OnInit {

  getId: any;
  updateForm: FormGroup;
  esercizioTesto: String = '';
  esercizioColore: String = '#ffffff';

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.crudService.getEsercizio(this.getId).subscribe(res => {
      this.updateForm.setValue({
        titolo: res[0]['titolo'],
        testo: res[0]['testo'],
        argomento: res[0]['argomento'],
        colore: res[0]['colore']
      });
      this.esercizioTesto = res[0]['testo'];
      this.esercizioColore = res[0]['colore'];
    });

    this.updateForm = this.formBuilder.group({
      titolo: [''],
      testo: [''],
      argomento: [''],
      colore: ['']
    })
  }

  ngOnInit() {
  }

  onUpdate(): any {
      this.crudService.updateEsercizio(this.getId, this.updateForm.value)
      .subscribe(() => {
          console.log('Esercizio aggiornato successfully!');
          this.ngZone.run(() => this.router.navigateByUrl('/esercizi'))
        }, (err) => {
          console.log(err);
      });
    }

}
