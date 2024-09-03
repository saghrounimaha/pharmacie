import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CmsNotificationsService {
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllCmsNotifications(): Observable<any> {
    return this.http.get(`${this.apiURL}/cms_notifications/getAllCmsNotifications`).pipe(
      catchError(this.handleError('getAllCmsNotifications'))
    );
  }

  createCmsNotification(cmsNotification: any): Observable<any> {
    return this.http.post(`${this.apiURL}/cms_notifications/createCmsNotification`, cmsNotification).pipe(
      catchError(this.handleError('createCmsNotification'))
    );
  }

  getCmsNotificationById(id: number): Observable<any> {
    return this.http.get(`${this.apiURL}/cms_notifications/getCmsNotificationById/${id}`).pipe(
      catchError(this.handleError('getCmsNotificationById'))
    );
  }

  updateCmsNotification(id: number, cmsNotification: FormData): Observable<any> {
    return this.http.put(`${this.apiURL}/cms_notifications/updateCmsNotification/${id}`, cmsNotification, {
      headers: new HttpHeaders({
        // Ajoute tout en-tête nécessaire ici
      }),
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.handleError('updateCmsNotification'))
    );
  }

  deleteCmsNotification(id: number){
    return this.http.delete(`${this.apiURL}/cms_notifications/deleteCmsNotification/${id}`).pipe(
      catchError(this.handleError('deleteCmsNotification'))
    );
  }
  

  private handleError(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<any> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(() => new Error(`${operation} failed: ${error.message}`));
    };
  }

}
