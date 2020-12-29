import { Component } from '@angular/core';
import { CrudService } from './service/crud.service';
import localeIt from '@angular/common/locales/it';
import { formatDate } from '@angular/common';

registerLocaleData(localeIt);

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
  aacorso: Number = 0;
  attivita : any = [];

  constructor(
      private crudService: CrudService
    ) {
      var oggi = new Date('2020-11-13');
      var aa = oggi.getFullYear();
      var nuovoaa = new Date(aa + '-09-15');
      var nuovoa = new Date(aa + '-01-01');
      if (oggi < nuovoaa && oggi >= nuovoa)
        aa = aa - 1;
      this.aacorso = aa;
      this.getNumEsercizi();
      this.getNumAttivita();
      this.getNumEsami();
      this.getAttivitaAnnoInCorso();
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

  getAttivitaAnnoInCorso(){
    this.crudService.getAttivitaAnno(this.aacorso).subscribe(res => {
      this.attivita = res;
    });
  }

}
