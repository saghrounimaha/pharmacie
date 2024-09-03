import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectionsService {
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllSections(): Observable<any> {
    return this.http.get(`${this.apiURL}/section/getAllSections`).pipe(
      catchError(this.handleError('getAllSections'))
    );
  }

  createSection(section: any): Observable<any> {
    return this.http.post(`${this.apiURL}/section/createSection`, section).pipe(
      catchError(this.handleError('createSection'))
    );
  }

  getSectionById(id: number): Observable<any> {
    return this.http.get(`${this.apiURL}/section/getSectionById/${id}`).pipe(
      catchError(this.handleError('getSectionById'))
    );
  }

  updateSection(id: number, section: FormData): Observable<any> {
    return this.http.put(`${this.apiURL}/section/updateSection/${id}`, section, {
      headers: new HttpHeaders({
        // Ajoute tout en-tête nécessaire ici
      }),
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.handleError('updateSection'))
    );
  }

  deleteSection(id: number){
    return this.http.delete(`${this.apiURL}/section/deleteSection/${id}`).pipe(
      catchError(this.handleError('deleteSection'))
    );
  }
  

  private handleError(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<any> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(() => new Error(`${operation} failed: ${error.message}`));
    };
  }

}
