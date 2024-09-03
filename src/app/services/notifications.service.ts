import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllNotifications(): Observable<any> {
    return this.http.get(`${this.apiURL}/notifications/getAllNotifications`).pipe(
      catchError(this.handleError('getAllNotifications'))
    );
  }

  createNotification(notification: any): Observable<any> {
    return this.http.post(`${this.apiURL}/notifications/createNotification`, notification).pipe(
      catchError(this.handleError('createNotification'))
    );
  }

  getNotificationById(id: number): Observable<any> {
    return this.http.get(`${this.apiURL}/notifications/getNotificationById/${id}`).pipe(
      catchError(this.handleError('getNotificationById'))
    );
  }

  updateNotification(id: number, notification: FormData): Observable<any> {
    return this.http.put(`${this.apiURL}/notifications/updateNotification/${id}`, notification, {
      headers: new HttpHeaders({
        // Ajoute tout en-tête nécessaire ici
      }),
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.handleError('updateNotification'))
    );
  }

  deleteNotification(id: number){
    return this.http.delete(`${this.apiURL}/notifications/deleteNotification/${id}`).pipe(
      catchError(this.handleError('deleteNotification'))
    );
  }
  

  private handleError(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<any> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(() => new Error(`${operation} failed: ${error.message}`));
    };
  }

}
