import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BonLivService {
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllBON_LIV(): Observable<any> {
    return this.http.get(`${this.apiURL}/BON_LIV/getAllBON_LIV`).pipe(
      catchError(this.handleError('getAllBON_LIV'))
    );
  }

  createBON_LIV(BON_LIV: any): Observable<any> {
    return this.http.post(`${this.apiURL}/BON_LIV/createBON_LIV`, BON_LIV).pipe(
      catchError(this.handleError('createBON_LIV'))
    );
  }

  getBON_LIVById(id: number): Observable<any> {
    return this.http.get(`${this.apiURL}/BON_LIV/getBON_LIVById/${id}`).pipe(
      catchError(this.handleError('getBON_LIVById'))
    );
  }

  updateBON_LIV(id: number, BON_LIV: FormData): Observable<any> {
    return this.http.put(`${this.apiURL}/BON_LIV/updateBON_LIV/${id}`, BON_LIV, {
      headers: new HttpHeaders({
        // Ajoute tout en-tête nécessaire ici
      }),
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.handleError('updateBON_LIV'))
    );
  }

  deleteBON_LIV(id: number){
    return this.http.delete(`${this.apiURL}/BON_LIV/deleteBON_LIV/${id}`).pipe(
      catchError(this.handleError('deleteBON_LIV'))
    );
  }
  

  private handleError(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<any> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(() => new Error(`${operation} failed: ${error.message}`));
    };
  }

}
