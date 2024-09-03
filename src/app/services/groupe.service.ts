import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupeService {

  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllGroupes(): Observable<any> {
    return this.http.get(`${this.apiURL}/groupes/getAllGroupes`).pipe(
      catchError(this.handleError('getAllGroupes'))
    );
  }

  createGroupe(groupe: any): Observable<any> {
    return this.http.post(`${this.apiURL}/groupes/createGroupe`, groupe).pipe(
      catchError(this.handleError('createGroupe'))
    );
  }

  getGroupeById(id: number): Observable<any> {
    return this.http.get(`${this.apiURL}/groupes/getGroupeById/${id}`).pipe(
      catchError(this.handleError('getGroupeById'))
    );
  }

  updateGroupe(id: number, groupe: FormData): Observable<any> {
    return this.http.put(`${this.apiURL}/groupes/updateGroupe/${id}`, groupe, {
      headers: new HttpHeaders({
        // Ajoute tout en-tête nécessaire ici
      }),
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.handleError('updateGroupe'))
    );
  }

  deleteGroupe(id: number){
    return this.http.delete(`${this.apiURL}/groupes/deleteGroupe/${id}`).pipe(
      catchError(this.handleError('deleteGroupe'))
    );
  }
  

  private handleError(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<any> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(() => new Error(`${operation} failed: ${error.message}`));
    };
  }

}

