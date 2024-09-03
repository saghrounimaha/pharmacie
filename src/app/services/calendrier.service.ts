import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendrierService {
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllCalendriers(): Observable<any> {
    return this.http.get(`${this.apiURL}/calendriers/getAllCalendriers`).pipe(
      catchError(this.handleError('getAllCalendriers'))
    );
  }

  createCalendrier(calendrier: any): Observable<any> {
    return this.http.post(`${this.apiURL}/calendriers/createCalendrier`, calendrier).pipe(
      catchError(this.handleError('createCalendrier'))
    );
  }

  getCalendrierById(id: number): Observable<any> {
    return this.http.get(`${this.apiURL}/calendriers/getCalendrierById/${id}`).pipe(
      catchError(this.handleError('getCalendrierById'))
    );
  }

  updateCalendrier(id: number, calendrier: FormData): Observable<any> {
    return this.http.put(`${this.apiURL}/calendriers/updateCalendrier/${id}`, calendrier, {
      headers: new HttpHeaders({
        // Ajoute tout en-tête nécessaire ici
      }),
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.handleError('updateCalendrier'))
    );
  }

  deleteCalendrier(id: number){
    return this.http.delete(`${this.apiURL}/calendriers/deleteCalendrier/${id}`).pipe(
      catchError(this.handleError('deleteCalendrier'))
    );
  }
  

  private handleError(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<any> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(() => new Error(`${operation} failed: ${error.message}`));
    };
  }

}
