import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnoncesService {
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllAnnonces(): Observable<any> {
    return this.http.get(`${this.apiURL}/annonces/getAllAnnonces`).pipe(
      catchError(this.handleError('getAllAnnonces'))
    );
  }

  createAnnonces(annonce: any): Observable<any> {
    return this.http.post(`${this.apiURL}/annonces/createAnnonces`, annonce).pipe(
      catchError(this.handleError('createAnnonces'))
    );
  }

  getNotificationById(id: number): Observable<any> {
    return this.http.get(`${this.apiURL}/annonces/getAnnoncesById/${id}`).pipe(
      catchError(this.handleError('getNotificationById'))
    );
  }

  updateAnnonces(id: number, annonce: FormData): Observable<any> {
    return this.http.put(`${this.apiURL}/annonces/updateAnnonces/${id}`, annonce, {
      headers: new HttpHeaders({
        // Ajoute tout en-tête nécessaire ici
      }),
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.handleError('updateAnnonces'))
    );
  }

  deleteAnnonces(id: number){
    return this.http.delete(`${this.apiURL}/annonces/deleteAnnonces/${id}`).pipe(
      catchError(this.handleError('deleteAnnonces'))
    );
  }
  

  private handleError(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<any> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(() => new Error(`${operation} failed: ${error.message}`));
    };
  }

}
