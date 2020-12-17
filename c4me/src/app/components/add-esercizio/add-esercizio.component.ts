import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from './../../service/crud.service';
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-add-esercizio',
  templateUrl: './add-esercizio.component.html',
  styleUrls: ['./add-esercizio.component.css']
})
export class AddEsercizioComponent implements OnInit {

  esercizioForm: FormGroup;
  nuovoID : Number = -1;

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
      this.crudService.addEsercizio(this.esercizioForm.value)
      .subscribe(() => {
          console.log('Esercizio aggiunto');
          this.crudService.getEsercizioAggiunto().subscribe(res => {
            console.log(res[0]["LAST_INSERT_ID()"]);
            this.nuovoID = res[0]["LAST_INSERT_ID()"];
            this.ngZone.run(() => this.router.navigateByUrl('/esercizio/' + this.nuovoID))
          });
//          this.ngZone.run(() => this.router.navigateByUrl('/esercizi'))
        }, (err) => {
          console.log(err);
      });
    }

}
