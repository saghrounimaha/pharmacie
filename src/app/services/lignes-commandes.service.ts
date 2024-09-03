import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LignesCommandesService {
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllLigneCommande(page: number, limit: number): Observable<any> {
    const params = new HttpParams()
    .set('page', page.toString())
    .set('limit', limit.toString());
    return this.http.get(`${this.apiURL}/ligneCommande/getAllLigneCommande`,{ params }).pipe(
      catchError(this.handleError('getAllLigneCommande'))
    );
  }

  createLigneCommande(ligneCommande: any): Observable<any> {
    return this.http.post(`${this.apiURL}/ligneCommande/createLigneCommande`, ligneCommande).pipe(
      catchError(this.handleError('createLigneCommande'))
    );
  }

  getLigneCommandeById(id: number): Observable<any> {
    return this.http.get(`${this.apiURL}/ligneCommande/getLigneCommandeById/${id}`).pipe(
      catchError(this.handleError('getLigneCommandeById'))
    );
  }

  updateLigneCommande(id: number, ligneCommande: FormData): Observable<any> {
    return this.http.put(`${this.apiURL}/ligneCommande/updateLigneCommande/${id}`, ligneCommande, {
      headers: new HttpHeaders({
        // Ajoute tout en-tête nécessaire ici
      }),
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.handleError('updateLigneCommande'))
    );
  }

  deleteLigneCommande(id: number){
    return this.http.delete(`${this.apiURL}/ligneCommande/deleteLigneCommande/${id}`).pipe(
      catchError(this.handleError('deleteLigneCommande'))
    );
  }
  

  private handleError(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<any> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(() => new Error(`${operation} failed: ${error.message}`));
    };
  }

}

