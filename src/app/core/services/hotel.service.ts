import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { GENERAL } from './../../app-config';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const path = GENERAL.ENTORNO.HOTEL_SERVICE;

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  constructor(private http: HttpClient) {}

  get(endpoint: string): Observable<any> {
    return this.http.get(path + endpoint, httpOptions).pipe(catchError(this.handleError));
  }

  // post(endpoint, element):Observable<any> {
  //     return this.http.post(path  + endpoint, element, httpOptions).pipe(
  //       catchError(this.handleError),
  //     );
  // }

  // put(endpoint, element,id):Observable<any> {
  //     return this.http.put(path  + endpoint + '/' + id, element, httpOptions).pipe(
  //       catchError(this.handleError),
  //     );
  // }

  // delete(endpoint, element):Observable<any> {
  //     return this.http.delete(path  + endpoint + '/' + element.Id, httpOptions).pipe(
  //       catchError(this.handleError),
  //     );
  // }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError({
      status: error.status,
      message: error.error.message
    });
  }
}
