import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepotService {

  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllDepots(): Observable<any> {
    return this.http.get(`${this.apiURL}/depots/getAllDepots`).pipe(
      catchError(this.handleError('getAllDepots'))
    );
  }

  createDepot(depot: any): Observable<any> {
    return this.http.post(`${this.apiURL}/depots/createDepot`, depot).pipe(
      catchError(this.handleError('createDepot'))
    );
  }

  getDepotById(id: number): Observable<any> {
    return this.http.get(`${this.apiURL}/depots/getDepotById/${id}`).pipe(
      catchError(this.handleError('getDepotById'))
    );
  }

  updateDepot(id: number, depot: FormData): Observable<any> {
    return this.http.put(`${this.apiURL}/depots/updateDepot/${id}`, depot, {
      headers: new HttpHeaders({
        // Ajoute tout en-tête nécessaire ici
      }),
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.handleError('updateDepot'))
    );
  }

  deleteDepot(id: number){
    return this.http.delete(`${this.apiURL}/depots/deleteDepot/${id}`).pipe(
      catchError(this.handleError('deleteDepot'))
    );
  }
  

  private handleError(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<any> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(() => new Error(`${operation} failed: ${error.message}`));
    };
  }
}
