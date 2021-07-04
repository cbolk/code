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
  filteredEsercizi : any = [];
  argomenti : any = [];

  page = 0;
  currentPage : any = 1;
  numPerPage : number = 9;
  numEsercizi : number;
  numEx : number;
  pagers : number;
  pagerArray : any = [];

  constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private crudService: CrudService
  ) {
    this.getEserciziSimple();
  }

  ngOnInit(): void {
  }

  getEserciziSimple(){
    this.crudService.getEsercizi(this.page).subscribe(res => {
      this.esercizi = res;
      this.numEsercizi = this.esercizi.length;
      if (this.numEsercizi > this.numPerPage) {
        this.pagers = Math.floor(this.numEsercizi / this.numPerPage);
      } else {
        this.pagers = 1
      }
      for (var i = 1; i <= this.pagers; i++) {
          this.pagerArray.push({
            id: i
        });
      }
      this.filteredEsercizi = this.esercizi.slice(0, this.numPerPage);
//      console.log(this.numEsercizi);
//      console.log(this.pagers);
//      console.log(this.pagerArray);
//      console.log(this.filteredEsercizi);
      console.log(this.currentPage);
    });
  }

  deleteEsercizio(eid) {
    console.log("chi elimino" + eid);
    this.crudService.deleteEsercizio(eid).subscribe(() => {
      this.getEserciziSimple();
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

  onPageChange (pageNumber: Number) {
    console.log(pageNumber);
    this.currentPage = pageNumber;

    //Set begin and end index
    var begin = ((this.currentPage - 1) * this.numPerPage);
    var end = begin + this.numPerPage;

    //perform the paging
    this.filteredEsercizi = this.esercizi.slice(begin, end);
  }
}
