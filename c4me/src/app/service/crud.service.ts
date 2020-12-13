import { Injectable } from '@angular/core';
import { esercizio } from './esercizio';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  REST_API: string = 'http://192.168.1.99:8080';

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  //getEsercizi
  getEsercizi(){
	   return this.httpClient.get(`${this.REST_API}/esercizi`);
  }

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
  AddEsercizio(data: esercizio): Observable<any> {
    let API_URL = `${this.REST_API}/add-esercizio`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Update
  updateEsercizio(id:any, data:any): Observable<any> {
    let API_URL = `${this.REST_API}/update-esercizio/${id}`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }

  // Delete
  deleteEsercizio(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-esercizio/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders})
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
