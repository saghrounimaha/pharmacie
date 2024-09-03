import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReclamationsService {
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllReclamations(): Observable<any> {
    return this.http.get(`${this.apiURL}/reclamations/getAllReclamations`).pipe(
      catchError(this.handleError('getAllReclamations'))
    );
  }

  createReclamation(reclamation: any): Observable<any> {
    return this.http.post(`${this.apiURL}/reclamations/createReclamation`, reclamation).pipe(
      catchError(this.handleError('createReclamation'))
    );
  }

  getReclamationById(id: number): Observable<any> {
    return this.http.get(`${this.apiURL}/reclamations/getReclamationById/${id}`).pipe(
      catchError(this.handleError('getReclamationById'))
    );
  }

  updateReclamation(id: number, reclamation: FormData): Observable<any> {
    return this.http.put(`${this.apiURL}/reclamations/updateReclamation/${id}`, reclamation, {
      headers: new HttpHeaders({
        // Ajoute tout en-tête nécessaire ici
      }),
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.handleError('updateReclamation'))
    );
  }

  deleteReclamation(id: number){
    return this.http.delete(`${this.apiURL}/reclamations/deleteReclamation/${id}`).pipe(
      catchError(this.handleError('deleteReclamation'))
    );
  }
  

  private handleError(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<any> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(() => new Error(`${operation} failed: ${error.message}`));
    };
  }

}
