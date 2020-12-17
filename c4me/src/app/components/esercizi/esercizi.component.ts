import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from './../../service/crud.service';

@Component({
  selector: 'app-esercizi',
  templateUrl: './esercizi.component.html',
  styleUrls: ['./esercizi.component.css']
})
export class EserciziComponent implements OnInit {

  esercizi : any = [];
  argomenti : any = [];

  page : Number = 0;
  count : Number;
  pageSize = 10;



  constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private crudService: CrudService
    ) {
    this.activatedRoute.queryParams.subscribe(params => {
        this.page = params['page'];
    });
  }

  ngOnInit(): void {
    this.crudService.getEsercizi(this.page).subscribe(res => {
      this.esercizi = res;
      console.log(this.page);
//      this.count = res.count;
    });
  }

  formatArgomentiList(testo: String): String {
    var strList = '<ul class="list;inline">';
    strList = strList + '<li class="list;inline;item">';
    strList = strList + testo.replace(/ /g, '</li><li class="list;inline;item">')
    strList = strList + '</ul>';
    return strList.replace(/-/g, ' ').replace(/;/g, '-');
  }

  formatArgomenti(testo: String): String {
    var strList = testo.replace(/ /g, '; ')
    return strList.replace(/-/g, ' ');
  }
}
