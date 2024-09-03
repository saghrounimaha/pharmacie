import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JourLivraisionService {
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllJourLivraisions(): Observable<any> {
    return this.http.get(`${this.apiURL}/jourlivraisions/getAllJourLivraisions`).pipe(
      catchError(this.handleError('getAllJourLivraisions'))
    );
  }

  createJourLivraision(jourlivraisions: any): Observable<any> {
    return this.http.post(`${this.apiURL}/jourlivraisions/createJourLivraision`, jourlivraisions).pipe(
      catchError(this.handleError('createJourLivraision'))
    );
  }

  getJourLivraisionById(id: number): Observable<any> {
    return this.http.get(`${this.apiURL}/jourlivraisions/getJourLivraisionById/${id}`).pipe(
      catchError(this.handleError('getJourLivraisionById'))
    );
  }

  updateJourLivraision(id: number, jourlivraisions: FormData): Observable<any> {
    return this.http.put(`${this.apiURL}/jourlivraisions/updateJourLivraision/${id}`, jourlivraisions, {
      headers: new HttpHeaders({
        // Ajoute tout en-tête nécessaire ici
      }),
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.handleError('updateJourLivraision'))
    );
  }

  deleteJourLivraision(id: number){
    return this.http.delete(`${this.apiURL}/jourlivraisions/deleteJourLivraision/${id}`).pipe(
      catchError(this.handleError('deleteJourLivraision'))
    );
  }
  

  private handleError(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<any> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(() => new Error(`${operation} failed: ${error.message}`));
    };
  }

}
