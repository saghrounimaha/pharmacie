import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllDashboard(): Observable<any> {
    return this.http.get(`${this.apiURL}/dashboard/getAllDashboard`).pipe(
      catchError(this.handleError('getAllDashboard'))
    );
  }

  createDashboard(depSection: any): Observable<any> {
    return this.http.post(`${this.apiURL}/dashboard/createDashboard`, depSection).pipe(
      catchError(this.handleError('createDashboard'))
    );
  }

  getDashboardById(id: number): Observable<any> {
    return this.http.get(`${this.apiURL}/dashboard/getDashboardById/${id}`).pipe(
      catchError(this.handleError('getDashboardById'))
    );
  }

  updateDashboard(id: number, depSection: FormData): Observable<any> {
    return this.http.put(`${this.apiURL}/dashboard/updateDashboard/${id}`, depSection, {
      headers: new HttpHeaders({
        // Ajoute tout en-tête nécessaire ici
      }),
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.handleError('updateDashboard'))
    );
  }

  deleteDashboard(id: number){
    return this.http.delete(`${this.apiURL}/dashboard/deleteDashboard/${id}`).pipe(
      catchError(this.handleError('deleteDashboard'))
    );
  }
  

  private handleError(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<any> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(() => new Error(`${operation} failed: ${error.message}`));
    };
  }

}
