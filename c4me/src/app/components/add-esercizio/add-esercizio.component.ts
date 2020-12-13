import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { CrudService } from './../../service/crud.service';

@Component({
  selector: 'app-add-esercizio',
  templateUrl: './add-esercizio.component.html',
  styleUrls: ['./add-esercizio.component.css']
})
export class AddEsercizioComponent implements OnInit {

  esercizioForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
  ) {
    this.esercizioForm = this.formBuilder.group({
      titolo: [''],
      testo: [''],
      argomento: [''],
      colore: ['']
    })
  }

  ngOnInit() {
  }

  onSubmit(): any {
    this.crudService.AddEsercizio(this.esercizioForm.value)
    .subscribe(() => {
        console.log('Esercizio aggiunto successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/esercizi'))
      }, (err) => {
        console.log(err);
    });
  }
}
