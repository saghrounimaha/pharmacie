import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaticComponentService {

  
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllStaticComponents(): Observable<any> {
    return this.http.get(`${this.apiURL}/staticComponents/getAllStaticComponents`).pipe(
      catchError(this.handleError('getAllStaticComponents'))
    );
  }

  createStaticComponent(staticComponent: any): Observable<any> {
    return this.http.post(`${this.apiURL}/staticComponents/createStaticComponent`, staticComponent).pipe(
      catchError(this.handleError('createStaticComponent'))
    );
  }

  getStaticComponentById(id: number): Observable<any> {
    return this.http.get(`${this.apiURL}/staticComponents/getStaticComponentById/${id}`).pipe(
      catchError(this.handleError('getStaticComponentById'))
    );
  }

  updateStaticComponent(id: number, staticComponent: FormData): Observable<any> {
    return this.http.put(`${this.apiURL}/staticComponents/updateStaticComponent/${id}`, staticComponent, {
      headers: new HttpHeaders({
        // Ajoute tout en-tête nécessaire ici
      }),
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.handleError('updateStaticComponent'))
    );
  }

  deleteStaticComponent(id: number){
    return this.http.delete(`${this.apiURL}/staticComponents/deleteStaticComponent/${id}`).pipe(
      catchError(this.handleError('deleteStaticComponent'))
    );
  }
  

  private handleError(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<any> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(() => new Error(`${operation} failed: ${error.message}`));
    };
  }

}

