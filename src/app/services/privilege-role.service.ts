import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrivilegeRoleService {
  apiURL ="http://localhost:3000"

  constructor(private http: HttpClient) { }

  allPrivilegesRole(){
    return this.http.get(`${this.apiURL}/privilegeRole/getAllprivilegeRole`);
    
   }
   getPrivilegesRoleById(id: number): Observable<any> {
    return this.http.get(`${this.apiURL}/privilegeRole/getPrivilegeRoleById/${id}`).pipe(
      catchError(this.handleError('getPrivilegeRoleById'))
    );
  }

   updatePrivilegesRole(id: number, privilegeRole: FormData): Observable<any> {
    return this.http.put(`${this.apiURL}/privilegeRole/updatePrivilegeRole/${id}`, privilegeRole, {
      
      headers: new HttpHeaders({
        // Ajoute tout en-tête nécessaire ici
      }),
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.handleError('updatePrivilegeRole'))
    );
  }

  deletePrivilegesRole(id: number){
    return this.http.delete(`${this.apiURL}/privilegeRole/deletePrivilegeRole/${id}`).pipe(
      catchError(this.handleError('deletePrivilegeRole'))
    );
  }
  

  private handleError(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<any> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(() => new Error(`${operation} failed: ${error.message}`));
    };
  }
 
}
