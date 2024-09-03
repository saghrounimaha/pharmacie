import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailTemplateService {
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllEmailTemplate(): Observable<any> {
    return this.http.get(`${this.apiURL}/emailTemplates/getAllEmailTemplate`).pipe(
      catchError(this.handleError('getAllEmailTemplate'))
    );
  }

  createEmailTemplate(emailTemplate: any): Observable<any> {
    return this.http.post(`${this.apiURL}/emailTemplates/createEmailTemplate`, emailTemplate).pipe(
      catchError(this.handleError('createEmailTemplate'))
    );
  }

  getEmailTemplateById(id: number): Observable<any> {
    return this.http.get(`${this.apiURL}/emailTemplates/getEmailTemplateById/${id}`).pipe(
      catchError(this.handleError('getEmailTemplateById'))
    );
  }

  updateEmailTemplate(id: number, emailTemplate: FormData): Observable<any> {
    return this.http.put(`${this.apiURL}/emailTemplates/updateEmailTemplate/${id}`, emailTemplate, {
      headers: new HttpHeaders({
        // Ajoute tout en-tête nécessaire ici
      }),
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.handleError('updateEmailTemplate'))
    );
  }

  deleteEmailTemplate(id: number){
    return this.http.delete(`${this.apiURL}/emailTemplates/deleteEmailTemplate/${id}`).pipe(
      catchError(this.handleError('deleteEmailTemplate'))
    );
  }
  

  private handleError(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<any> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(() => new Error(`${operation} failed: ${error.message}`));
    };
  }

}
