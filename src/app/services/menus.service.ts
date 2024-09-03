import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenusService {
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllCmsMenus(): Observable<any> {
    return this.http.get(`${this.apiURL}/cms_menus/getAllCmsMenus`).pipe(
      catchError(this.handleError('getAllCmsMenus'))
    );
  }

  createCmsMenu(menus: any): Observable<any> {
    return this.http.post(`${this.apiURL}/cms_menus/createCmsMenu`, menus).pipe(
      catchError(this.handleError('createCmsMenu'))
    );
  }

  getCmsMenuById(id: number): Observable<any> {
    return this.http.get(`${this.apiURL}/cms_menus/getCmsMenuById/${id}`).pipe(
      catchError(this.handleError('getCmsMenuById'))
    );
  }

  updateCmsMenu(id: number, menus: FormData): Observable<any> {
    return this.http.put(`${this.apiURL}/cms_menus/updateCmsMenu/${id}`, menus, {
      headers: new HttpHeaders({
        // Ajoute tout en-tête nécessaire ici
      }),
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.handleError('updateCmsMenu'))
    );
  }

  deleteCmsMenu(id: number){
    return this.http.delete(`${this.apiURL}/cms_menus/deleteCmsMenu/${id}`).pipe(
      catchError(this.handleError('deleteCmsMenu'))
    );
  }
  

  private handleError(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<any> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(() => new Error(`${operation} failed: ${error.message}`));
    };
  }

}
