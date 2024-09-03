import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusCmdsService {

  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllStatusCmds(): Observable<any> {
    return this.http.get(`${this.apiURL}/statusCmds/getAllStatusCmds`).pipe(
      catchError(this.handleError('getAllStatusCmds'))
    );
  }

  createStatusCmds(statusCmds: any): Observable<any> {
    return this.http.post(`${this.apiURL}/statusCmds/createStatusCmds`, statusCmds).pipe(
      catchError(this.handleError('createStatusCmds'))
    );
  }

  getStatusCmdsById(id: number): Observable<any> {
    return this.http.get(`${this.apiURL}/statusCmds/getStatusCmdsById/${id}`).pipe(
      catchError(this.handleError('getStatusCmdsById'))
    );
  }

  updateStatusCmds(id: number, statusCmds: FormData): Observable<any> {
    return this.http.put(`${this.apiURL}/statusCmds/updateStatusCmds/${id}`, statusCmds, {
      headers: new HttpHeaders({
        // Ajoute tout en-tête nécessaire ici
      }),
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.handleError('updateStatusCmds'))
    );
  }

  deleteStatusCmds(id: number){
    return this.http.delete(`${this.apiURL}/statusCmds/deleteStatusCmds/${id}`).pipe(
      catchError(this.handleError('deleteStatusCmds'))
    );
  }
  

  private handleError(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<any> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(() => new Error(`${operation} failed: ${error.message}`));
    };
  }

}

