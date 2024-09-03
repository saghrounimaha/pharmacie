import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BonLivLGService {
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllBON_LIV_LG(): Observable<any> {
    return this.http.get(`${this.apiURL}/BON_LIV_LG/getAllBON_LIV_LG`).pipe(
      catchError(this.handleError('getAllBON_LIV'))
    );
  }

  createBON_LIV_LG(BON_LIV_LG: any): Observable<any> {
    return this.http.post(`${this.apiURL}/BON_LIV_LG/createBON_LIV_LG`, BON_LIV_LG).pipe(
      catchError(this.handleError('createBON_LIV_LG'))
    );
  }

  getBON_LIV_LGById(id: number): Observable<any> {
    return this.http.get(`${this.apiURL}/BON_LIV_LG/getBON_LIV_LGById/${id}`).pipe(
      catchError(this.handleError('getBON_LIV_LGById'))
    );
  }

  updateBON_LIV_LG(id: number, BON_LIV_LG: FormData): Observable<any> {
    return this.http.put(`${this.apiURL}/BON_LIV_LG/updateBON_LIV_LG/${id}`, BON_LIV_LG, {
      headers: new HttpHeaders({
        // Ajoute tout en-tête nécessaire ici
      }),
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.handleError('updateBON_LIV_LG'))
    );
  }

  deleteBON_LIV_LG(id: number){
    return this.http.delete(`${this.apiURL}/BON_LIV_LG/deleteBON_LIV_LG/${id}`).pipe(
      catchError(this.handleError('deleteBON_LIV_LG'))
    );
  }
  

  private handleError(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<any> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(() => new Error(`${operation} failed: ${error.message}`));
    };
  }

}
