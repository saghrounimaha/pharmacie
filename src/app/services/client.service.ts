import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllClients(): Observable<any> {
    return this.http.get(`${this.apiURL}/clients/getAllClients`).pipe(
      catchError(this.handleError('getAllClients'))
    );
  }

  createClient(client: any): Observable<any> {
    return this.http.post(`${this.apiURL}/clients/createClient`, client).pipe(
      catchError(this.handleError('createClient'))
    );
  }

  getClientById(id: number): Observable<any> {
    return this.http.get(`${this.apiURL}/clients/getClientById/${id}`).pipe(
      catchError(this.handleError('getClientById'))
    );
  }

  updateClient(id: number, client: FormData): Observable<any> {
    return this.http.put(`${this.apiURL}/clients/updateClient/${id}`, client, {
      headers: new HttpHeaders({
        // Ajoute tout en-tête nécessaire ici
      }),
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.handleError('updateClient'))
    );
  }

  deleteClient(id: number){
    return this.http.delete(`${this.apiURL}/clients/deleteClient/${id}`).pipe(
      catchError(this.handleError('deleteClient'))
    );
  }
  

  private handleError(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<any> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(() => new Error(`${operation} failed: ${error.message}`));
    };
  }
}

