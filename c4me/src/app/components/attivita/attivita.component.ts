import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from './../../service/crud.service';

@Component({
  selector: 'app-attivita',
  templateUrl: './attivita.component.html',
  styleUrls: ['./attivita.component.css']
})

export class AttivitaComponent implements OnInit {

  numeroattivita : Number = 0;
  aacorso: Number = 0;
  attivita : any = [];
  numattivitaanno : Number = 0;

  constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private crudService: CrudService
    ) {
      var oggi = new Date('2020-11-13');
      var aa = oggi.getFullYear();
      var nuovoaa = new Date(aa + '-09-15');
      var nuovoa = new Date(aa + '-01-01');
      if (oggi < nuovoaa && oggi >= nuovoa)
        aa = aa - 1;
      this.aacorso = aa;
      this.getAttivitaAnnoInCorso();
  }

  ngOnInit(): void {
//    this.numattivitaanno = this.attivita.length;
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
