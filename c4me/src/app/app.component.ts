import { Component } from '@angular/core';
import { CrudService } from './service/crud.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { //implements OnInit {
  title = 'C for Me';
  numeroesercizi : Number = 0;
  numeroattivita : Number = 0;
  numerolezioni : Number = 0;
  numeroesami : Number = 0;

  constructor(
      private crudService: CrudService
    ) {
      this.getNumEsercizi();
      this.getNumAttivita();
      this.getNumEsami();
  }

  getNumEsercizi(){
    this.crudService.getNumeroEsercizi().subscribe(res => {
      this.numeroesercizi = res[0]['NUM'];
    });
  }

  getNumLezioni(){
    this.crudService.getNumeroLezioni().subscribe(res => {
      this.numerolezioni = res[0]['NUM'];
    });
  }

  getNumEsami(){
    this.crudService.getNumeroEsami().subscribe(res => {
      this.numeroesami = res[0]['NUM'];
    });
  }

  getNumAttivita(){
    this.crudService.getNumeroAttivita().subscribe(res => {
      this.numeroattivita = res[0]['NUM'];
    });
  }

}
