import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from './../../service/crud.service';

@Component({
  selector: 'app-lezione',
  templateUrl: './lezione.component.html',
  styleUrls: ['./lezione.component.css']
})
export class LezioneComponent implements OnInit {

  lezId: any;
  lezione : any = {};
  esercizi : any = [];
  soluzioni : any = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService
  ) {
    this.lezId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log("boh" + this.lezId);
    this.crudService.getLezione(this.lezId).subscribe(res => {
      this.lezione = res[0];
    });
  }

  ngOnInit(): void {
    this.crudService.getEserciziLezione(this.lezId).subscribe(res => {
      this.esercizi = res;
    });
    this.crudService.getSoluzioniEserciziLezione(this.lezId).subscribe(res => {
      this.soluzioni = res;
    });
  }

}
