import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupecltsService {
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllGroupesClts(): Observable<any> {
    return this.http.get(`${this.apiURL}/groupeClts/getAllGroupeClts`).pipe(
      catchError(this.handleError('getAllGroupeClts'))
    );
  }

  createGroupeClts(groupeClts: any): Observable<any> {
    return this.http.post(`${this.apiURL}/groupeClts/createGroupeClts`, groupeClts).pipe(
      catchError(this.handleError('createGroupeClts'))
    );
  }

  getGroupeByIdClts(id: number): Observable<any> {
    return this.http.get(`${this.apiURL}/groupeClts/getGroupeCltsById/${id}`).pipe(
      catchError(this.handleError('getGroupeCltsById'))
    );
  }

  updateGroupeClts(id: number, groupeClts: FormData): Observable<any> {
    return this.http.put(`${this.apiURL}/groupeClts/updateGroupeClts/${id}`, groupeClts, {
      headers: new HttpHeaders({
        // Ajoute tout en-tête nécessaire ici
      }),
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.handleError('updateGroupeClts'))
    );
  }

  deleteGroupeClts(id: number){
    return this.http.delete(`${this.apiURL}/groupeClts/deleteGroupeClts/${id}`).pipe(
      catchError(this.handleError('deleteGroupeClts'))
    );
  }
  

  private handleError(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<any> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(() => new Error(`${operation} failed: ${error.message}`));
    };
  }

}
