import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailQueuesService {

  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllEmailQueues(): Observable<any> {
    return this.http.get(`${this.apiURL}/email_queues/getAllEmailQueues`).pipe(
      catchError(this.handleError('getAllEmailQueues'))
    );
  }

  createEmailQueue(depSection: any): Observable<any> {
    return this.http.post(`${this.apiURL}/email_queues/createEmailQueue`, depSection).pipe(
      catchError(this.handleError('createEmailQueue'))
    );
  }

  getEmailQueueById(id: number): Observable<any> {
    return this.http.get(`${this.apiURL}/email_queues/getEmailQueueById/${id}`).pipe(
      catchError(this.handleError('getEmailQueueById'))
    );
  }

  updateEmailQueue(id: number, depSection: FormData): Observable<any> {
    return this.http.put(`${this.apiURL}/email_queues/updateEmailQueue/${id}`, depSection, {
      headers: new HttpHeaders({
      }),
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.handleError('updateEmailQueue'))
    );
  }

  deleteEmailQueue(id: number){
    return this.http.delete(`${this.apiURL}/email_queues/deleteEmailQueue/${id}`).pipe(
      catchError(this.handleError('deleteEmailQueue'))
    );
  }
  

  private handleError(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<any> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(() => new Error(`${operation} failed: ${error.message}`));
    };
  }

}
