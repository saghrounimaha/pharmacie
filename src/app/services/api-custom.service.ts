import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiCustomService {
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllCmsApiCustoms(): Observable<any> {
    return this.http.get(`${this.apiURL}/cms_apicustom/getAllCmsApiCustoms`).pipe(
      catchError(this.handleError('getAllCmsApiCustoms'))
    );
  }

  createCmsApiCustom(apicustom: any): Observable<any> {
    return this.http.post(`${this.apiURL}/cms_apicustom/createCmsApiCustom`, apicustom).pipe(
      catchError(this.handleError('createCmsApiCustom'))
    );
  }

  getCmsApiCustomById(id: number): Observable<any> {
    return this.http.get(`${this.apiURL}/cms_apicustom/getCmsApiCustomById/${id}`).pipe(
      catchError(this.handleError('getCmsApiCustomById'))
    );
  }

  updateCmsApiCustom(id: number, apicustom: FormData): Observable<any> {
    return this.http.put(`${this.apiURL}/cms_apicustom/updateCmsApiCustom/${id}`, apicustom, {
      headers: new HttpHeaders({
        // Ajoute tout en-tête nécessaire ici
      }),
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.handleError('updateCmsApiCustom'))
    );
  }

  deleteCmsApiCustom(id: number){
    return this.http.delete(`${this.apiURL}/cms_apicustom/deleteCmsApiCustom/${id}`).pipe(
      catchError(this.handleError('deleteCmsApiCustom'))
    );
  }
  

  private handleError(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<any> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(() => new Error(`${operation} failed: ${error.message}`));
    };
  }

}
