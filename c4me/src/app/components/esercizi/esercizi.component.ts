import { Component, OnInit } from '@angular/core';
import { CrudService } from './../../service/crud.service';

@Component({
  selector: 'app-esercizi',
  templateUrl: './esercizi.component.html',
  styleUrls: ['./esercizi.component.css']
})
export class EserciziComponent implements OnInit {

  esercizi : any = [];
  argomenti : any = [];

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.crudService.getEsercizi().subscribe(res => {
      this.esercizi =res;
    });
  }

  formatArgomenti(args: string): string {
    return args.replace(/ /g, ', ').replace(/-/g, ' ');
  }

}
