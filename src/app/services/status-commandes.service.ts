import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusCommandesService {

  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllStatusCommande(): Observable<any> {
    return this.http.get(`${this.apiURL}/statusCommande/getAllStatusCommande`).pipe(
      catchError(this.handleError('getAllStatusCommande'))
    );
  }

  createStatusCommande(statusCommande: any): Observable<any> {
    return this.http.post(`${this.apiURL}/statusCommande/createStatusCommande`, statusCommande).pipe(
      catchError(this.handleError('createStatusCommande'))
    );
  }

  getStatusCommandeById(id: number): Observable<any> {
    return this.http.get(`${this.apiURL}/statusCommande/getStatusCommandeById/${id}`).pipe(
      catchError(this.handleError('getStatusCommandeById'))
    );
  }

  updateStatusCommande(id: number, statusCommande: FormData): Observable<any> {
    return this.http.put(`${this.apiURL}/statusCommande/updateStatusCommande/${id}`, statusCommande, {
      headers: new HttpHeaders({
        // Ajoute tout en-tête nécessaire ici
      }),
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.handleError('updateStatusCommande'))
    );
  }

  deleteStatusCommande(id: number){
    return this.http.delete(`${this.apiURL}/statusCommande/deleteStatusCommande/${id}`).pipe(
      catchError(this.handleError('deleteStatusCommande'))
    );
  }
  

  private handleError(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<any> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(() => new Error(`${operation} failed: ${error.message}`));
    };
  }

}

