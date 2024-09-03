import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllCommande(page: number = 1, limit: number = 10): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get(`${this.apiURL}/commande/getAllCommandes`, { params }).pipe(
      catchError(this.handleError('getAllCommandes'))
    );
  }

  createCommande(commande: any): Observable<any> {
    return this.http.post(`${this.apiURL}/commande/createCommande`, commande).pipe(
      catchError(this.handleError('createCommande'))
    );
  }

  getCommandeById(id: number): Observable<any> {
    return this.http.get(`${this.apiURL}/commande/getCommandeById/${id}`).pipe(
      catchError(this.handleError('getCommandeById'))
    );
  }

  updateCommande(id: number, commande: FormData): Observable<any> {
    return this.http.put(`${this.apiURL}/commande/updateCommande/${id}`, commande, {
      headers: new HttpHeaders({
        // Ajoute tout en-tête nécessaire ici
      }),
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.handleError('updateCommande'))
    );
  }

  deleteCommande(id: number){
    return this.http.delete(`${this.apiURL}/commande/deleteCommande/${id}`).pipe(
      catchError(this.handleError('deleteCommande'))
    );
  }
  

  private handleError(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<any> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(() => new Error(`${operation} failed: ${error.message}`));
    };
  }
}
