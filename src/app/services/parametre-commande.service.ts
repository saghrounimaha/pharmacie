import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ParametreCommandeService {
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllParametreCommandes(): Observable<any> {
    return this.http.get(`${this.apiURL}/parametreCommandes/getAllParametreCommandes`).pipe(
      catchError(this.handleError('getAllParametreCommandes'))
    );
  }

  createParametreCommande(cmsNotification: any): Observable<any> {
    return this.http.post(`${this.apiURL}/parametreCommandes/createParametreCommande`, cmsNotification).pipe(
      catchError(this.handleError('createParametreCommande'))
    );
  }

  getParametreCommandeById(id: number): Observable<any> {
    return this.http.get(`${this.apiURL}/parametreCommandes/getParametreCommandeById/${id}`).pipe(
      catchError(this.handleError('getParametreCommandeById'))
    );
  }

  updateParametreCommande(id: number, cmsNotification: FormData): Observable<any> {
    return this.http.put(`${this.apiURL}/parametreCommandes/updateParametreCommande/${id}`, cmsNotification, {
      headers: new HttpHeaders({
        // Ajoute tout en-tête nécessaire ici
      }),
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.handleError('updateParametreCommande'))
    );
  }

  deleteParametreCommande(id: number){
    return this.http.delete(`${this.apiURL}/parametreCommandes/deleteParametreCommande/${id}`).pipe(
      catchError(this.handleError('deleteParametreCommande'))
    );
  }
  

  private handleError(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<any> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(() => new Error(`${operation} failed: ${error.message}`));
    };
  }

}
