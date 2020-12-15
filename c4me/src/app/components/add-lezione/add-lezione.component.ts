import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { CrudService } from './../../service/crud.service';

@Component({
  selector: 'app-add-lezione',
  templateUrl: './add-lezione.component.html',
  styleUrls: ['./add-lezione.component.css']
})
export class AddLezioneComponent implements OnInit {

  lezioneForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
  ) {
    this.lezioneForm = this.formBuilder.group({
      data: [''],
      annoaccademico: [''],
      tipologia: [''],
      argomento: ['']
    })
  }

  ngOnInit() {
  }

  onSubmit(): any {
    this.crudService.addLezione(this.lezioneForm.value)
    .subscribe(() => {
        console.log('Lezione aggiunta!')
        this.ngZone.run(() => this.router.navigateByUrl('/lezione/'))
      }, (err) => {
        console.log(err);
    });
  }

}
