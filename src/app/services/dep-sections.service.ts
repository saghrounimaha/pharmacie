import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepSectionsService {
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllDepSections(): Observable<any> {
    return this.http.get(`${this.apiURL}/depSection/getAllDepSections`).pipe(
      catchError(this.handleError('getAllDepSections'))
    );
  }

  createDepSection(depSection: any): Observable<any> {
    return this.http.post(`${this.apiURL}/depSection/createDepSection`, depSection).pipe(
      catchError(this.handleError('createDepSection'))
    );
  }

  getDepSectionById(id: number): Observable<any> {
    return this.http.get(`${this.apiURL}/depSection/getDepSectionById/${id}`).pipe(
      catchError(this.handleError('getDepSectionById'))
    );
  }

  updateDepSection(id: number, depSection: FormData): Observable<any> {
    return this.http.put(`${this.apiURL}/depSection/updateDepSection/${id}`, depSection, {
      headers: new HttpHeaders({
        // Ajoute tout en-tête nécessaire ici
      }),
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.handleError('updateDepSection'))
    );
  }

  deleteDepSection(id: number){
    return this.http.delete(`${this.apiURL}/depSection/deleteDepSection/${id}`).pipe(
      catchError(this.handleError('deleteDepSection'))
    );
  }
  

  private handleError(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<any> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(() => new Error(`${operation} failed: ${error.message}`));
    };
  }

}
