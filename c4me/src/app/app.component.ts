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
      this.attivita = res.map((a) => {
        if (a.titolo != null)
          a.titolo = a.titolo.replace(/code/g,"tt");
        if (a.argomento != null)
          a.argomento = a.argomento.replace(/code/g,"tt");
        if (a.cb == 1)
          a.chi = 'far fa-user-circle';
        else
          a.chi = 'fas fa-user-circle';
        a.data = a.data;
        a.ore = a.ore;
        if(a.tipologia == 'lezione')
          a.classe = 'text-primary';
        else if (a.tipologia == 'esercitazione' || a.tipologia == 'analisi')
          a.classe = 'text-success';
        else if (a.tipologia == 'laboratorio')
          a.classe = 'text-info';
        else if (a.tipologia == 'sospensione')
          a.classe = 'text-danger';
        else if (a.tipologia == 'esame')
          a.classe = 'text-secondary';
        else
          a.classe = 'text-warning';

        a.tipologia = a.tipologia;
        return a;
      });
    });
  }



}
