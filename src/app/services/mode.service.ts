import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModeService {
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllModePayement(): Observable<any> {
    return this.http.get(`${this.apiURL}/modepayements/getAllModePayement`).pipe(
      catchError(this.handleError('getAllModePayement'))
    );
  }

  createModePayement(mode: any): Observable<any> {
    return this.http.post(`${this.apiURL}/modepayements/createModePayement`, mode).pipe(
      catchError(this.handleError('createModePayement'))
    );
  }

  getModePayementById(id: number): Observable<any> {
    return this.http.get(`${this.apiURL}/modepayements/getModePayementById/${id}`).pipe(
      catchError(this.handleError('getModePayementById'))
    );
  }

  updateModePayement(id: number, mode: FormData): Observable<any> {
    return this.http.put(`${this.apiURL}/modepayements/updateModePayement/${id}`, mode, {
      headers: new HttpHeaders({
        // Ajoute tout en-tête nécessaire ici
      }),
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.handleError('updateModePayement'))
    );
  }

  deleteModePayement(id: number){
    return this.http.delete(`${this.apiURL}/modepayements/deleteModePayement/${id}`).pipe(
      catchError(this.handleError('deleteModePayement'))
    );
  }
  

  private handleError(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<any> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(() => new Error(`${operation} failed: ${error.message}`));
    };
  }

}
