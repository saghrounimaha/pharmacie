import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllSettings(): Observable<any> {
    return this.http.get(`${this.apiURL}/setting/getAllSettings`).pipe(
      catchError(this.handleError('getAllSettings'))
    );
  }

  createSetting(setting: any): Observable<any> {
    return this.http.post(`${this.apiURL}/setting/createSetting`, setting).pipe(
      catchError(this.handleError('createSetting'))
    );
  }

  getSettingById(id: number): Observable<any> {
    return this.http.get(`${this.apiURL}/setting/getSettingById/${id}`).pipe(
      catchError(this.handleError('getSettingById'))
    );
  }

  updateSetting(id: number, setting: FormData): Observable<any> {
    return this.http.put(`${this.apiURL}/setting/updateSetting/${id}`, setting, {
      headers: new HttpHeaders({
        // Ajoute tout en-tête nécessaire ici
      }),
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.handleError('updateSetting'))
    );
  }

  deleteSetting(id: number){
    return this.http.delete(`${this.apiURL}/setting/deleteSetting/${id}`).pipe(
      catchError(this.handleError('deleteSetting'))
    );
  }
  

  private handleError(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<any> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(() => new Error(`${operation} failed: ${error.message}`));
    };
  }

}
