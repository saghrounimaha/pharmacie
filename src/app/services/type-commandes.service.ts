import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeCommandesService {
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllTypeCommande(): Observable<any> {
    return this.http.get(`${this.apiURL}/typeCommande/getAllTypeCommande`).pipe(
      catchError(this.handleError('getAllTypeCommande'))
    );
  }

  createTypeCommande(ligneCommande: any): Observable<any> {
    return this.http.post(`${this.apiURL}/typeCommande/createTypeCommande`, ligneCommande).pipe(
      catchError(this.handleError('createTypeCommande'))
    );
  }

  getTypeCommandeById(id: number): Observable<any> {
    return this.http.get(`${this.apiURL}/typeCommande/getTypeCommandeById/${id}`).pipe(
      catchError(this.handleError('getTypeCommandeById'))
    );
  }

  updateTypeCommande(id: number, ligneCommande: FormData): Observable<any> {
    return this.http.put(`${this.apiURL}/typeCommande/updateTypeCommande/${id}`, ligneCommande, {
      headers: new HttpHeaders({
        // Ajoute tout en-tête nécessaire ici
      }),
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.handleError('updateTypeCommande'))
    );
  }

  deleteTypeCommande(id: number){
    return this.http.delete(`${this.apiURL}/typeCommande/deleteTypeCommande/${id}`).pipe(
      catchError(this.handleError('deleteTypeCommande'))
    );
  }
  

  private handleError(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<any> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(() => new Error(`${operation} failed: ${error.message}`));
    };
  }

}

