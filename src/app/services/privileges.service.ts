import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrivilegesService {
  apiURL ="http://localhost:3000"

  constructor(private http: HttpClient) { }

  allPrivileges(){
    return this.http.get(`${this.apiURL}/privilege/allPrivileges`);
    
   }

   updatePrivileges(id: number, privilege: FormData): Observable<any> {
    return this.http.put(`${this.apiURL}/privilege/updatePrivileges/${id}`, privilege, {
      headers: new HttpHeaders({
        // Ajoute tout en-tête nécessaire ici
      }),
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.handleError('updatePrivileges'))
    );
  }

  deletePrivileges(id: number){
    return this.http.delete(`${this.apiURL}/privilege/deletePrivilege/${id}`).pipe(
      catchError(this.handleError('deletePrivilege'))
    );
  }
  

  private handleError(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<any> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(() => new Error(`${operation} failed: ${error.message}`));
    };
  }
 
}
