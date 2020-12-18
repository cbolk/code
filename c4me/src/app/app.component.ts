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

  constructor(
      private crudService: CrudService
    ) {
      this.getNumEsercizi();
  }

  getNumEsercizi(){
    this.crudService.getNumeroEsercizi().subscribe(res => {
      this.numeroesercizi = res[0]['NUM'];
    });
  }

}
