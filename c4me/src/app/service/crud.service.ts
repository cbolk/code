import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { esercizio } from './esercizio';
import { lezione } from './lezione';


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  REST_API: string = 'http://192.168.1.99:8080';

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  //
  //Esercizi
  //
  // Lista
  getEsercizi(pagenum:Number = 0){
	   return this.httpClient.get(`${this.REST_API}/esercizi?page=${pagenum}`);
  }

  getNumeroEsercizi(){
	   return this.httpClient.get(`${this.REST_API}/numeroesercizi`);
  }

  // Esercizio
  //usata??
  getEsercizio(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/esercizio/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
	  .pipe(map((res: any) => {
	     return res || {}
	  }),
	  catchError(this.handleError)
	  )
  }

  // Add
  addEsercizio(data: esercizio): Observable<any> {
    let API_URL = `${this.REST_API}/esercizio`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  getEsercizioAggiunto(){
	   return this.httpClient.get(`${this.REST_API}/getlastid`);
  }

  // Update
  updateEsercizio(id:any, data:any): Observable<any> {
    let API_URL = `${this.REST_API}/esercizio/${id}`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }
  // Delete
  deleteEsercizio(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/esercizio/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders})
    .pipe(
        catchError(this.handleError)
      )
  }

  // Lista esami in cui e' stato usato l'esercizio id
  getEsamiEsercizio(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/esercizio/${id}/esami`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
	  .pipe(map((res: any) => {
	     return res || {}
	  }),
	  catchError(this.handleError)
	  )
  }

  getNumeroEsami(){
	   return this.httpClient.get(`${this.REST_API}/numeroesami`);
  }


  //
  //  Soluzioni
  //
  // Lista soluzioni di un esercizio id
  getSoluzioniEsercizio(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/esercizio/${id}/soluzioni`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
	  .pipe(map((res: any) => {
	     return res || {}
	  }),
	  catchError(this.handleError)
	  )
  }

  //
  // lezioni
  getTipologia(){
	   return this.httpClient.get(`${this.REST_API}/lezioni/tipologia`);
  }

  getNumeroLezioni(){
	   return this.httpClient.get(`${this.REST_API}/numerolezioni`);
  }

  getLezione(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/lezione/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
	  .pipe(map((res: any) => {
	     return res || {}
	  }),
	  catchError(this.handleError)
	  )
  }

  getLezioni(): Observable<any> {
    let API_URL = `${this.REST_API}/lezioni/`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
	  .pipe(map((res: any) => {
	     return res || {}
	  }),
	  catchError(this.handleError)
	  )
  }

  getLezioniAnno(ianno:any): Observable<any> {
    let API_URL = `${this.REST_API}/lezioni/${ianno}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
	  .pipe(map((res: any) => {
	     return res || {}
	  }),
	  catchError(this.handleError)
	  )
  }

  getEserciziLezione(idlez:any): Observable<any> {
    let API_URL = `${this.REST_API}/lezione/${idlez}/esercizi`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
	  .pipe(map((res: any) => {
	     return res || {}
	  }),
	  catchError(this.handleError)
	  )
  }

  getSoluzioniEserciziLezione(idlez:any): Observable<any> {
    let API_URL = `${this.REST_API}/lezione/${idlez}/soluzioni`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
	  .pipe(map((res: any) => {
	     return res || {}
	  }),
	  catchError(this.handleError)
	  )
  }

  addLezione(data: lezione): Observable<any> {
    let API_URL = `${this.REST_API}/add-lezione`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }



  handleError(error: HttpErrorResponse){
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
