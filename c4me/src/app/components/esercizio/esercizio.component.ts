import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from './../../service/crud.service';


@Component({
  selector: 'app-esercizio',
  templateUrl: './esercizio.component.html',
  styleUrls: ['./esercizio.component.css']
})
export class EsercizioComponent implements OnInit {

//  esercizio : any = {};
  getId: any;
  esercizio : any = {};
  esami : any = [];
  soluzioni : any = [];
  testo : String = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.crudService.getEsercizio(this.getId).subscribe(res => {
      this.esercizio = res[0];
    });
  }

  ngOnInit(): void {
    this.crudService.getSoluzioniEsercizio(this.getId).subscribe(res => {
      this.soluzioni = res;
    });
    this.crudService.getEsamiEsercizio(this.getId).subscribe(res => {
      this.esami = res;
    });
  }

  formatArgomenti(testo: String): String {
    var strList = '<ul class="list;inline">';
    strList = strList + '<li class="list;inline;item">';
    strList = strList + testo.replace(/ /g, '</li><li class="list;inline;item">')
    strList = strList + '</ul>';
    return strList.replace(/-/g, ' ').replace(/;/g, '-');
  }

}
