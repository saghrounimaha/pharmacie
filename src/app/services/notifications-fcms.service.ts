import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsFcmsService {
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllNotificationsFcms(): Observable<any> {
    return this.http.get(`${this.apiURL}/notificationfcms/getAllNotificationsFcms`).pipe(
      catchError(this.handleError('getAllNotificationsFcms'))
    );
  }

  createNotificationsFcms(notificationFCMS: any): Observable<any> {
    return this.http.post(`${this.apiURL}/notificationfcms/createNotificationsFcms`, notificationFCMS).pipe(
      catchError(this.handleError('createNotificationsFcms'))
    );
  }

  getNotificationsFcmsById(id: number): Observable<any> {
    return this.http.get(`${this.apiURL}/notificationfcms/getNotificationsFcmsById/${id}`).pipe(
      catchError(this.handleError('getNotificationsFcmsById'))
    );
  }

  updateNotificationsFcms(id: number, notificationFCMS: FormData): Observable<any> {
    return this.http.put(`${this.apiURL}/notificationfcms/updateNotificationsFcms/${id}`, notificationFCMS, {
      headers: new HttpHeaders({
        // Ajoute tout en-tête nécessaire ici
      }),
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.handleError('updateNotificationsFcms'))
    );
  }

  deleteNotificationsFcms(id: number){
    return this.http.delete(`${this.apiURL}/notificationfcms/deleteNotificationsFcms/${id}`).pipe(
      catchError(this.handleError('deleteNotificationsFcms'))
    );
  }
  

  private handleError(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<any> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(() => new Error(`${operation} failed: ${error.message}`));
    };
  }

}
